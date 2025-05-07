const mongoose = require('mongoose')

const mailboxSchema = mongoose.Schema({
 activation_date: {
  type: Date,
  required: true,
 },
 token: {
  type: String,
  required: true
 },
 isActive: {
  type: Boolean,
  default: true
 },
 userId: {
  type: String, // нужен для запросов
  required: true
 },
 mailboxAddress: {
  type: String, // нужен для запросов
  required: true
 }
})

module.exports = mongoose.model('Mailbox', mailboxSchema)