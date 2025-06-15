const {
 getMessages,
 getMessage,
 patchMessageSeen,
 removeMessage,
 downloadItem
} = require('../../services/mailtm')
const { getMailboxTokenDB } = require('../../models/boxes.model')
const AppError = require('../../error/AppError');
const UNAUTHENTICATED_ERROR = new AppError('auth', 401, 'You are not authorized')

// переделать чтобы не фронт передавал токен, а бэк предоставлял его по id ящика
async function getMessagesList(req, res) {
 if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
 const { mailboxId } = req.params
 const token = await getMailboxTokenDB(mailboxId)
 const messagesList = await getMessages(token)
 res.status(200).json({ ...messagesList })
}

async function getMessageContent(req, res) {
 if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
 const { mailboxId, messageId } = req.params
 const token = await getMailboxTokenDB(mailboxId)
 const message = await getMessage(token, messageId)
 res.status(200).json({ ...message })
}

async function makeMessageSeen(req, res) {
 if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
 const { mailboxId, messageId } = req.params
 const token = await getMailboxTokenDB(mailboxId)
 const message = await patchMessageSeen(token, messageId)
 res.status(200).json({ ...message })
}

async function deleteMessage(req, res) {
 if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
 const { mailboxId, messageId } = req.params
 const token = await getMailboxTokenDB(mailboxId)
 const message = await removeMessage(token, messageId)
 res.status(200).json({ ...message })
}

async function getMessageAttachments(req, res) {
 if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
 const { mailboxId, messageId } = req.params
 const token = await getMailboxTokenDB(mailboxId)
 const message = await getMessage(token, messageId)
 res.status(200).json({ attachments: message.attachments })
}

async function downloadAttachment(req, res) {
 if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
 const { mailboxId, messageId, attachmentName } = req.params
 const token = await getMailboxTokenDB(mailboxId)
 const response = await downloadItem(token, messageId, attachmentName)
 response.data.pipe(res)
}

module.exports = {
 getMessagesList,
 getMessageContent,
 makeMessageSeen,
 deleteMessage,
 getMessageAttachments,
 downloadAttachment
}