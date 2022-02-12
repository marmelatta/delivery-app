const express = require('express');
const router = express.Router();


const {User} = require('../models');

/*router.get('/',
    function (req, res) {
        res.render('home', { user: req.user })
    })

router.get('/login',
    function (req, res) {
        res.render('login')
    })

router.post('/login',
    passport.authenticate(
        'local',
        {
            failureRedirect: '/login',
        },
    ),
    function (req, res) {
        console.log("req.user: ", req.user)
        res.redirect('/')
    })

router.get('/logout',
    function (req, res) {
        req.logout()
        res.redirect('/')
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
        res.render('profile', { user: req.user })
    })*/