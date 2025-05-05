const express = require('express')
const {
 createUser,
 createMailbox
} = require('./boxes.controller')
const boxesRouter = express.Router()

// создать ящик
// неправильно это user
boxesRouter.post('/', createUser) // {address, pass}

// создать ящик по нормальному
boxesRouter.post('/new', createMailbox)


// получить все ящики
//boxesRouter.get('/')

// получить конкретный ящик
//boxesRouter.get('/{id}')

module.exports = boxesRouter