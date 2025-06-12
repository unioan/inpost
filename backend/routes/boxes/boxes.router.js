const express = require('express')
const tryCatch = require('../../error/tryCatch')
const {
 createMailbox,
 getMailboxes
} = require('./boxes.controller')
const boxesRouter = express.Router()

// создать ящик
boxesRouter.post('/', tryCatch(createMailbox)) 
// получить все ящики пользователя
boxesRouter.get('/', tryCatch(getMailboxes)) 

module.exports = boxesRouter