const mongoose = require('mongoose')
const { randomBytes } = require('crypto');
const User = require('./User')

async function createDBUser(credentials) {
 const existingUser = await uniqueLogin(credentials.login);
 if (existingUser) {
  const err = new Error();
  err.code = 400;
  throw err;
 }

 const user = new User({ ...credentials })
 await user.save()
}

function generateMailboxCredentials(domain) {
 return {
  address: `${randomString(8)}@${domain}`,
  password: `${randomString(12)}`
 }
}

//check if user already exists
async function uniqueLogin(login) {
 return User.find({ login })
}

// generates random string
function randomString(length) {
 if (length % 2 !== 0) {
  length++;
 }

 return randomBytes(length / 2).toString("hex");
}

module.exports = {
 createDBUser,
 generateMailboxCredentials
}