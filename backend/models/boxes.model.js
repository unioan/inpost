const { randomBytes } = require('crypto');
const Mailbox = require('./Mailbox')

async function createMailboxDB(data) {
 const mailbox = Mailbox(data)
 await mailbox.save()
 return mailbox
}

function generateAddressAndPassword(domain) {
 return {
  address: `${randomString(8)}@${domain}`,
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
 generateAddressAndPassword
}