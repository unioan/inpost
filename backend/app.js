const express = require('express')
const app = express()
const errorHandler = require('./error/errorHandler')
const usersRoute = require('./routes/users/users.route')
const boxesRouter = require('./routes/boxes/boxes.router')
const messagesRouter = require('./routes/messages/messages.router')
const passport = require('passport')
const session = require('express-session')
require('./strategies/local-strategy')

app.use(express.json());
app.use(session({
 secret: "jepe",
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

// сейчас будем имплементировать auth enndpoint где будет вызываться проверочная функция из require('./strategies/local-strategy') и все чекать
// passport.authenticate('local') - будет тригирить код из local-strategy
app.use('/auth', passport.authenticate('local'), (request, response) => {
 response.sendStatus(200)
})

app.use(errorHandler)

module.exports = app