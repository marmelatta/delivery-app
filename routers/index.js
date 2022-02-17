const express = require('express');
const router = express.Router();
const passport = require('passport');

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
        console.log("req.user: ", req.user.toString())
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

module.exports = router;