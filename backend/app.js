const express = require('express')
const app = express()
const usersRoute = require('./routes/users/users.route')
const boxesRouter = require('./routes/boxes/boxes.router')

app.use(express.json());

app.use('/users', usersRoute)
app.use('/boxes', boxesRouter)

module.exports = app