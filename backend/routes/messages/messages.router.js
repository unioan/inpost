const express = require('express')
const {
 getMessagesList,
 getMessageContent,
 makeMessageSeen,
 deleteMessage,
 getMessageAttachments,
 downloadAttachment
} = require('./messages.controller')
const tryCatch = require('../../error/tryCatch')
const messagesRouter = express.Router()

messagesRouter.get('/:mailboxId', tryCatch(getMessagesList))
messagesRouter.get('/:mailboxId/:messageId', tryCatch(getMessageContent))
messagesRouter.get('/attachments/:mailboxId/:messageId', tryCatch(getMessageAttachments))
messagesRouter.get('/attachments/:mailboxId/:messageId/:attachmentName', tryCatch(downloadAttachment))
messagesRouter.patch('/:mailboxId/:messageId', tryCatch(makeMessageSeen))
messagesRouter.delete('/:mailboxId/:messageId', tryCatch(deleteMessage))

module.exports = messagesRouter
