var express = require('express')
var passport = require('passport')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        css: ['style.css'],
        js: ['main.js']
    })
})

router.post('/login', passport.authenticate('local', {
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!'
}), (req, res) => {
    res.redirect('/users/' + req.user.username)
})

module.exports = router
