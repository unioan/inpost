const express = require('express')
const { createUser } = require('./users.controller')
const tryCatch = require('../../error/tryCatch')
const usersRouter = express.Router()

// Создать аккаунт в приложении
usersRouter.post('/', tryCatch(createUser))

module.exports = usersRouter