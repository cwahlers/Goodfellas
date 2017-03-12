'use strict'
const Controllers = require('../controllers/controllers')
const models = require('../models/index')
const passport = require('passport')
require('../config/passport.js')(passport, models.user)
const express = require('express')
const router = express.Router()

router.get('/', Controllers.home)
router.get('/register', Controllers.register)
router.get('/login', Controllers.login)
router.get('/portal', Controllers.isLoggedIn, Controllers.portal)
router.get('/logout', Controllers.logout)

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email', 'user_friends']
}))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/portal',
    failureRedirect: '/login'
}))

router.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
}))

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
}))

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/portal',
    failureRedirect: '/register'
}))

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/portal',
    failureRedirect: '/login'
}))

module.exports = router
