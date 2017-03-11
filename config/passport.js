'use strict'
const bCrypt = require('bcrypt-nodejs')

module.exports = function(passport, user) {

    const LocalStrategy = require('passport-local').Strategy
    const FacebookStrategy = require('passport-facebook').Strategy
    const GoogleStrategy = require('passport-google-oauth20').Strategy
    const User = user

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
        })
    }))

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
                console.log('user not found')
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
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: [
            'id',
            'name',
            'displayName',
            'picture',
            'email',
            'gender',
            'birthday',
            'cover',
            'age_range',
            'locale',
            'timezone'
        ]
    }, (accessToken, refreshToken, profile, cb) => {

        let person = profile._json
        console.log(person)

        // let profileData = {
        //     id: profile.id,
        //     firstName: profile.name.givenName,
        //     middleName: profile.name.middleName,
        //     lastName: profile.name.familyName,
        //     gender: profile.gender,
        //     email: profile.emails[0],
        //     picture: profile.photos[0]
        // }

        User.findOrCreate({
            where: {
                facebookId: profile.id
            },
            defaults: {
                password: ''
            }
        }).spread((user, created) => {
            return cb(null, user)
        })
    }))

//     passport.use(new GoogleStrategy({
//     clientID:     GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://yourdormain:3000/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({where:{ googleId: profile.id }},  (err, user) => {
//       return done(err, user)
//     })
//   }
// ))


} //module.exports
