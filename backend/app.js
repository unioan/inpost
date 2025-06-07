const express = require('express')
const app = express()
const errorHandler = require('./error/errorHandler')
const usersRoute = require('./routes/users/users.route')
const boxesRouter = require('./routes/boxes/boxes.router')
const messagesRouter = require('./routes/messages/messages.router')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
require('./strategies/local-strategy')

app.use(cors({
 origin: 'http://localhost:5173', // your frontend port
 credentials: true               // allow cookies and headers
}));
app.use(express.json());
app.use(session({
 name: "inpost.sid",
 secret: "r#Sg7UH%iR@pdLd0cOzQaThicxGEQ",
 saveUninitialized: false,
 resave: false,
 cookie: {
  maxAge: 60000 * 60
 }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/users', usersRoute)
app.use('/boxes', boxesRouter)
app.use('/messages', messagesRouter)

app.use(errorHandler)

module.exports = app