var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.render('home', {title: 'Home', css:['style.css']})
})

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login', css:['login.css']})
})

router.get('/portal', (req, res) => {
    res.render('portal', {title: 'Portal', css:['portal.css']})
})

router.post('/register', (req, res) => {
    res.render('register', {title: 'Register', css:['register.css']})
})


module.exports = router
