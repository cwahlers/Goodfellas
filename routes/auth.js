var authController = require('../controllers/authController')

module.exports = function(app) {
    app.get('/register', authController.register)
}
