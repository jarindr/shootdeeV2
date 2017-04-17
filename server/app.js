const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const apiRoute = require('./routes/apiRoute')
const indexRoute = require('./routes/indexRoute')
const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/public', express.static(path.resolve(__dirname, './public')))
app.use('/api', apiRoute)
app.use('/', indexRoute)

module.exports = app
