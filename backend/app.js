const express = require('express')
const app = express()
const boxesRouter = require('./routes/boxes/boxes.router')

app.use(express.json());

app.use('/boxes', boxesRouter)

module.exports = app