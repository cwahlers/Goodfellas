'use strict'
const Controllers   = require('../controllers/controllers')
const models        = require('../models/index')
const passport      = require('passport')
require('../config/passport.js')(passport, models.user)
const express       = require('express')
const router        = express.Router()

router.get('/', Controllers.home)
router.get('/register', Controllers.register)
router.get('/login', Controllers.login)
router.get('/portal', Controllers.isLoggedIn, Controllers.portal)
router.get('/logout', Controllers.logout)

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/portal',
    failureRedirect: '/register'
}))

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/portal',
    failureRedirect: '/login'
}))

module.exports = router
