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

router.get('/portal', (req, res) => {
    res.render('portal', {
        title: 'Portal',
        css: ['portal.css'],
        js: ['main.js']
    })
})

router.post('/register')

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        css: ['register.css'],
        js: ['main.js']
    })
})

router.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	})

module.exports = router
