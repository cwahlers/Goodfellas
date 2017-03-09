'use strict'
var express         = require('express')
var exphbs          = require('express-handlebars')
var bodyParser      = require('body-parser')
var cookieParser    = require('cookie-parser')
var session         = require('express-session')
var passport        = require('passport')
var LocalStrategy   = require('passport-local').Strategy
var morgan          = require('morgan')
var flash           = require('connect-flash')
var path            = require('path')
var mysql           = require('mysql')
var port            = process.env.PORT || 8080
var routes          = require('./routes/index.js')

var app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/build')))

app.use(session({
  secret: 'goodfellas',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', routes)

app.listen(port)

module.exports = app
