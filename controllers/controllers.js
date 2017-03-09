module.exports = {
    register: function(req, res) {
        res.render('register', {
            title: 'Register',
            css: ['register.css'],
            js: ['main.js']
        })
    },
    login: function(req, res) {
        res.render('login', {
            title: 'Login',
            css: ['login.css'],
            js: ['main.js']
        })
    },
    home: function(req, res) {
        res.render('home', {
            title: 'Login',
            css: ['style.css'],
            js: ['main.js']
        })
    }
}
