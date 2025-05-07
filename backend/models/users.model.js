const User = require('./User')

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

async function addMailboxToUser(userId, mailbox) {
 return await User.findOneAndUpdate({ login: 'jepe' }, {
  $push: { active_mailboxes: mailbox._id }
 })
}

async function uniqueLogin(login) {
 return User.find({ login })
}

module.exports = {
 createDBUser,
 addMailboxToUser
}