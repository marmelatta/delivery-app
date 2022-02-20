const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const expressSession = require('express-session')
const User = require('./models/User')
let bcrypt = require('bcrypt');

// Routing
const indexRouter = require('./routers/index');
const advertisementRouter = require('./routers/advertisement')
const chatRouter = require('./routers/chat')
const http = require("http");
const socketIO = require('socket.io');
const mongoose = require("mongoose");

async function verify(email, password, done) {
    User.findOne({email: email})
        .then(
            user => {
                console.log('login...', user)
                if (user) {
                    bcrypt.compare(password,
                        user.passwordHash,
                        (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, {message: "Wrong passport"});
                            }
                        })
                }
            }
        )
        .catch(err => {
            return done(null, false, {message: err});
        })
}

const options = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false,
}

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser(function (user, cb) {
    cb(null, user.id)
})

passport.deserializeUser(async function (id, cb) {
    const user = await User.findById(id);
    cb(null, user);
})

const app = express();
const server = http.Server(app); // создаётся http server
const io = socketIO(server); // прицепляетсч сокет ио

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSession({
    secret: process.env.COOKIE_SECRET || 'dfkkf',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize(undefined));
app.use(passport.session(undefined));


app.use('/', indexRouter);
app.use('/public', express.static(__dirname + '/public'));
app.use('/api/advertisements', advertisementRouter);
app.use('/api/chat', chatRouter);

const rooms = {};
io.on('connection', (socket) => {// обрабатывается событие соединения
    const {id} = socket;
    console.log(`Socket connected: ${id}`)

    //сообщение мне
    socket.on('send-message', (msg) => {
        msg.type = 'send-message';
        console.log('receiver', msg.receiver);
        console.log('author', msg.author);
        console.log('text', msg.text);
        socket.broadcast.emit('new-message', msg) //рассылает всем
        socket.emit('new-message', msg);
    });

    //сообщение для всех
    socket.on('get-history', (msg) => { // принимает сообщение от клиента
        msg.type = 'get-history';
        socket.broadcast.emit('chat-history', msg) //рассылает всем
        socket.emit('chat-history', msg);// отправляем себе
    })

    //работа с комнатами
    /*
    const {roomName} = socket.handshake.query;
    console.log(`Socket room name: ${roomName}`)
    socket.join(roomName);
    if (roomName) {
        if (!rooms[roomName]) {
            rooms[roomName] = {roomName, messages: []};
        } else {
            setTimeout(() => {
                socket.emit('messages-in-room', {messages: rooms[roomName].messages});
            }, 200);
        }
    }

    socket.on('message-to-room', (msg) => {
        msg.type = `room ${roomName}`;
        if (roomName) {
            rooms[roomName].messages.push(msg);
        }
        socket.to(roomName).emit('message-to-room', msg); //отправить всем пользователям, подписанным на эту комнату
        socket.emit('message-to-room', msg); //отправляем в то же самое соединение
    });*/

    //отключение
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    })
})

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || '12345';
const NameDB = process.env.DB_NAME || 'express_books_database';
const HostDB = process.env.DB_HOST || 'mongodb://localhost:27017/';

async function start() {
    try {
        await mongoose.connect(HostDB, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // начинаем прослушивать подключения на 3000 порту
        server.listen(PORT, () => {
            console.log(`Server is running, go to http://localhost:${PORT}/`)
        }); // для сокет ио нужно запускать на уровне http сервера
    } catch (e) {
        console.log(e);
    }
}

start();