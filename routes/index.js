var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.render('home', {css:[process.cwd + 'style.css']});
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/portal', (req, res) => {
    res.render('portal')
})

router.post('/register', (req, res) => {
    res.render('register')
})


module.exports = router
