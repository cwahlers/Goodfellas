'use strict'
const path            = require('path')
const express         = require('express')
const app             = express()
const exphbs          = require('express-handlebars')
const bodyParser      = require('body-parser')
const cookieParser    = require('cookie-parser')
const session         = require('express-session')
const passport        = require('passport')
const flash           = require('connect-flash')
const port            = process.env.PORT || 8080
const env             = require('dotenv').load()
const models          = require('./models/index')
const routes          = require('./routes/routes')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(cookieParser())
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

models.sequelize.sync()
.then(() => console.log('Nice! Database looks fine'))
.catch(err => console.log(err, 'Something went wrong with the Database Update!'))

app.use('/', routes)
app.listen(port, () => console.log(`Listening on port: ${port}`))

module.exports = app
