var exports = module.exports = {}

exports.register = function(req, res) {
    res.render('register', {
        title: 'Register',
        css: ['register.css'],
        js: ['main.js']
    })
}
