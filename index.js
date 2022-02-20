const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const expressSession = require('express-session')
const db = require('./models')
const User = require('./models/User')
let bcrypt = require('bcrypt');

// Routing
const indexRouter = require('./routers/index');
const advertisementRouter = require('./routers/advertisement')
const http = require("http");
const mongoose = require("mongoose");

async function verify (email, password, done) {
    db.users.findByUsername(email,  function (err, user) {
        if (err) { return done(err) }
        if (!user) {return done(null, false) }

        let passwordValid = user && bcrypt.compareSync(password, user.passwordHash)

        // If password valid call done and serialize user.id to req.user property
        if (passwordValid) {
            return done(null, user)
        }
        // If invalid call done with false and flash message
        return done(null, false, {
            message: 'Invalid email and/or password'
        });
    })
}

const options = {
    emailFiled: 'email',
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
    /*db.users.findById(id,  function (err, user) {
        if (err) {return cb(err) }
        
    })*/
})

const app = express();
const server = http.Server(app); // создаётся http server

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