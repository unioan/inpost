const express = require('express')
const { 
 createUser,
 getUser
 } = require('./users.controller')
const usersRouter = express.Router()

usersRouter.post('/', createUser)
usersRouter.get('/:userId', getUser)

module.exports = usersRouter