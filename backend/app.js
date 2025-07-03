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
const path = require('path')
require('dotenv').config()

const SESSION_NAME = process.env.SESSION_NAME
const SESSION_SECRET = process.env.SESSION_SECRET

// app.use(cors({
//  origin: 'http://localhost:5173', // your frontend port
//  credentials: true               // allow cookies and headers
// }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
 name: SESSION_NAME,
 secret: SESSION_SECRET,
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
app.all('/{*any}', (req, res, next) => { 
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use(errorHandler)

module.exports = app