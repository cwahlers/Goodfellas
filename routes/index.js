var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('home', {title: 'Home', css:['style.css'], js:['main.js']})
})

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login', css:['login.css'], js:['main.js']})
})

router.get('/portal', (req, res) => {
    res.render('portal', {title: 'Portal', css:['portal.css'], js:['main.js']})
})

router.post('/register', (req, res) => {
    res.render('register', {title: 'Register', css:['register.css'], js:['main.js']})
})


module.exports = router
