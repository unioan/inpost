const User = require('./User')
const Mailbox = require('./Mailbox')

async function createDBUser(credentials) {
 const existingUser = await uniqueLogin(credentials.login);

 if (existingUser.length > 0) {
  const err = new Error();
  err.code = 400;
  throw err;
 }

 const user = new User({ ...credentials })
 await user.save()
 return user
}

async function uniqueLogin(login) {
 return User.find({ login })
}

module.exports = {
 createDBUser
}