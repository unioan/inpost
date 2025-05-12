const express = require('express')
const tryCatch = require('../../error/tryCatch')
const {
 createMailbox,
 getMailboxes,
 changeField
} = require('./boxes.controller')
const boxesRouter = express.Router()

// создать ящик
boxesRouter.post('/', tryCatch(createMailbox)) 
boxesRouter.get('/:userId', tryCatch(getMailboxes)) 
boxesRouter.post('/changeField', tryCatch(changeField)) 

// получить все ящики
//boxesRouter.get('/')

// получить конкретный ящик
//boxesRouter.get('/{id}')

module.exports = boxesRouter