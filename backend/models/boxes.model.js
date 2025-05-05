const { randomBytes } = require('crypto');

function generateMailboxCredentials(domain) {
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
 generateMailboxCredentials
}