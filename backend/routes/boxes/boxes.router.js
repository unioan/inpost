const express = require('express')
const { createUser } = require('./boxes.controller')
const boxesRouter = express.Router()

// создать ящик
boxesRouter.post('/', createUser) // {address, pass}

// получить все ящики
//boxesRouter.get('/')

// получить конкретный ящик
//boxesRouter.get('/{id}')

module.exports = boxesRouter