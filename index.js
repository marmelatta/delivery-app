const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const expressSession = require('express-session')
const db = require('./models')

// Routing
const indexRouter = require('./routers/index');
const advertisementRouter = require('./routers/advertisement')

function verify (username, password, done) {
    db.users.findByUsername(username,  function (err, user) {
        if (err) { return done(err) }
        if (!user) {return done(null, false) }

        if (!db.users.verifyPassword(user,  password)) { return done(null, false) }

        return done(null, user)
    })
}

const options = {
    usernameFiled: 'username',
    passwordField: 'password',
    passReqToCallback: false,
}

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser(function (user, cb) {
    cb(null, user.id)
})

passport.deserializeUser(function (id, cb) {
    db.users.findById(id,  function (err, user) {
        if (err) {return cb(err) }
        cb(null, user);
    })
})

const app = express();

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

const PORT = process.env.port || 3000;
app.listen(PORT,  () => {
    console.log(`Server is running port ${PORT}`);
});