const express = require('express')
const { createUser } = require('./users.controller')
const usersRouter = express.Router()

// Создать аккаунт в приложении
usersRouter.post('/', createUser)

module.exports = usersRouter