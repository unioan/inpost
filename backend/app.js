const express = require('express')
const app = express()
const errorHandler = require('./error/errorHandler')
const usersRoute = require('./routes/users/users.route')
const boxesRouter = require('./routes/boxes/boxes.router')
const messagesRouter = require('./routes/messages/messages.router')

app.use(express.json());

app.use('/users', usersRoute)
app.use('/boxes', boxesRouter)
app.use('/messages', messagesRouter)

app.use(errorHandler)

module.exports = app