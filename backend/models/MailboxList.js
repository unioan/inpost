const mongoose = require('mongoose')
const Mailbox = require('./Mailbox').schema

const MailboxListSchema = mongoose.Schema({
 userId: {
  type: String,
  require: true
 },
 activeMailboxes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Mailbox'
 }],
 inactiveMailboxes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Mailbox'
 }]
})

module.exports = mongoose.model('MailboxList', MailboxListSchema)
