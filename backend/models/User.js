const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
 login: {
  type: String,
  required: true,
  trim: true
 },
 password: {
  type: String,
  required: true,
  trim: true
 },
 active_mailboxes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Mailbox'
 }],
 inactive_mailboxes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Mailbox'
 }]
})

module.exports = mongoose.model('User', userSchema)