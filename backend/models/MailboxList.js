const mongoose = require('mongoose')
const Mailbox = require('./Mailbox').schema

const MailboxListSchema = mongoose.Schema({
 userId: {
  type: String,
  require: true
 },
 activeMailboxes: [Mailbox],
 inactiveMailboxes: [Mailbox]
})

module.exports = mongoose.model('MailboxList', MailboxListSchema)
