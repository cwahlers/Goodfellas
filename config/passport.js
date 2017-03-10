'use strict'
const bCrypt = require('bcrypt-nodejs')

module.exports = function(passport, user) {

    const User = user
    const LocalStrategy = require('passport-local').Strategy
    const FacebookStrategy = require('passport-facebook').Strategy
    const GoogleStrategy = require('passport-google-oauth20').Strategy

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (user) {
                done(null, user.get())
            } else {
                done(user.errors, null)
            }
        })
    })

    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {

        function generateHash(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)
        }

        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                return done(null, false, {message: 'That email is already taken'})
            } else {
                let userPassword = generateHash(password)
                let data = {
                    email: email,
                    password: userPassword,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }

                User.create(data).then((newUser, created) => {
                    if (!newUser) {
                        return done(null, false)
                    } else {
                        return done(null, newUser)
                    }
                })
            }
        }) // User.then
    })) //passport.use local-register

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {

        function isValidPassword(userPass, passwordInput) {
            return bCrypt.compareSync(passwordInput, userPass)
        }

        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                return done(null, false, {message: 'Email does not exist'})
            }

            if (!isValidPassword(user.password, password)) {
                return done(null, false, {message: 'Incorrect password'})
            }

            let userInfo = user.get()
            console.log(userInfo)
            return done(null, userInfo)

        }).catch(err => {
            console.log('Error: ', err)
            return done(null, false, {message: 'Something went wrong with your login'})
        })

    }))

    passport.use(new FacebookStrategy({
        clientID: 771688802985373,
        clientSecret: '74e5824642c707d97b08002c93a15fcc',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    }, (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({facebookId: profile.id}, (err, user) => {
        return cb(err, user)
      })
    }))

    passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    })
  }
))

} //module.exports
