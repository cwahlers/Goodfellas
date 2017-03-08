'use strict'
var express = require('express')
var exphbs  = require('express-handlebars')
//var bodyParser = require('body-parser')
var passport = require('passport') //user auth
var morgan = require('morgan')
var path = require('path')
//var mysql = require('mysql')

var routes = require('./routes/index.js')

var app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(morgan('dev'))

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/build')))
app.use('/', routes)

app.listen(3000)

module.exports = app
