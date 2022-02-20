const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User')
let bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    res.json('hello');
})

router.get('',
    function (req, res) {
        console.log('после аутентификации переходит сюда')
        res.json({user: req.user})
    })

router.get('/signin',
    function (req, res) {
        res.json('login')
    })

router.post('/signin',
    passport.authenticate(
        'local',
        {
            failureRedirect: '/signin',
        },
    ),
    function (req, res) {
        console.log("req.user: ", req.email.toString())
        res.redirect('/')
    })

router.get('/logout',
    function (req, res) {
        req.logout()
        res.json(`dllsdluu`)
    })

router.get('/profile',
    function (req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            if (req.session) {
                req.session.returnTo = req.originalUrl || req.url
            }
            return res.redirect('/login')
        }
        next()
    },
    function (req, res) {
        return res.json({ user: req.user })
    })

router.post('/signup',
    async (req, res, next) => {
        const {email, password, name, contactPhone} = req.body;
        let user = await User.findOne({email: email})
        if (user) {
            return res.json("email занят")
        }
        
        let newUser = await User.create({
            email,
            passwordHash: bcrypt.hashSync(password, 10), // hash the password early
            name: name, 
            contactPhone: contactPhone,
        })

        return res.json(newUser);

    });

module.exports = router;