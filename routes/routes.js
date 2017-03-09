var Controllers     = require('../controllers/controllers')
var express         = require('express')
var router          = express.Router()

router.get('/', Controllers.home)
router.get('/register', Controllers.register)
router.get('/login', Controllers.login)

//router.post('/register', Controllers.register)

module.exports = router
