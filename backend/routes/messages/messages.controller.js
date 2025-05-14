const {
 getMessages,
 getMessage
} = require('../../services/mailtm')
const { getMailboxTokenDB } = require('../../models/boxes.model')

// переделать чтобы не фронт передавал токен, а бэк предоставлял его по id ящика
async function getMessagesList(req, res) {
 const { mailboxId } = req.params
 const token = await getMailboxTokenDB(mailboxId)
 const messagesList = await getMessages(token)
 res.status(200).json({ ...messagesList })
}

async function getMessageContent(req, res) {
 const { mailboxId, messageId } = req.params
 const token = await getMailboxTokenDB(mailboxId)
 const message = await getMessage(token, messageId)
 res.status(200).json({ ...message })
}

module.exports = {
 getMessagesList,
 getMessageContent
}