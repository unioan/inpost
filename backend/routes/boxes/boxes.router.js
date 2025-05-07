const express = require('express')
const tryCatch = require('../../error/tryCatch')
const {
 createMailbox
} = require('./boxes.controller')
const boxesRouter = express.Router()

// создать ящик
boxesRouter.post('/', tryCatch(createMailbox)) 

// получить все ящики
//boxesRouter.get('/')

// получить конкретный ящик
//boxesRouter.get('/{id}')

module.exports = boxesRouter