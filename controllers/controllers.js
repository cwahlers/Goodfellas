'use strict'
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
    },
    portal: function(req, res) {
        res.render('portal', {
            title: 'Portal',
            css: ['portal.css'],
            js: ['main.js']
        })
    },
    logout: function(req, res) {
        req.session.destroy(err => res.redirect('/'))
    },
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    }
}
