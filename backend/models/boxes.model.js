require('dotenv').config()
const Mailbox = require('./Mailbox')
const { randomBytes } = require('crypto');
const { addMinutes } = require('date-fns');
const MAILBOX_EXPIRATION_TIME = process.env.MAILBOX_EXPIRATION_TIME || 10

async function createMailboxDB(userId, mailtmAccount, token) {
 const { address: mailboxAddress, createdAt } = mailtmAccount
 const expiresAt = addMinutes(new Date(createdAt), MAILBOX_EXPIRATION_TIME)
 const mailbox = Mailbox({ userId, mailboxAddress, expiresAt, token })
 await mailbox.save()
 return mailbox
}

function generateMailboxAddressAndPassword(login, domain) {
 return {
  address: `${randomString(8)}_${login}@${domain}`,
  password: `${randomString(12)}`
 }
}

// generates random string
function randomString(length) {
 if (length % 2 !== 0) {
  length++;
 }

 return randomBytes(length / 2).toString("hex");
}

module.exports = {
 createMailboxDB,
 generateMailboxAddressAndPassword
}