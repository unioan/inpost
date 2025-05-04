const mongoose = require('mongoose')
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

//check if user already exists
async function uniqueLogin(login) {
 return User.find({ login })
}

module.exports = {
 createDBUser
}