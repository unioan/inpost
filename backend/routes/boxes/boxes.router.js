const express = require('express')
const tryCatch = require('../../error/tryCatch')
const {
 createMailbox,
 getMailboxes
} = require('./boxes.controller')
const boxesRouter = express.Router()

// создать ящик
boxesRouter.post('/', tryCatch(createMailbox)) 
boxesRouter.get('/:userId', tryCatch(getMailboxes)) 

// получить все ящики
//boxesRouter.get('/')

// получить конкретный ящик
//boxesRouter.get('/{id}')

module.exports = boxesRouter