import apiRoute from './routes/apiRoute'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import database from './database/database'
import express from 'express'
import indexRoute from './routes/indexRoute'
import logger from 'morgan'
import path from 'path'

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/public', express.static(path.resolve(__dirname, './public')))
app.use('/api', apiRoute)
app.use('/', indexRoute)
database.connect()

module.exports = app
