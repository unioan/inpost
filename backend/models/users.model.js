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
 const updatedUser = await User.findByIdAndUpdate(userId, {
  $push: { active_mailboxes: mailbox._id }
 }, {
  returnDocument: 'after'
 }
 )
 return updatedUser
}

async function getUsersActiveMailboxes(userId) {
 const activeMailboxes = User.findById(userId, {active_mailboxes: 1})
 return activeMailboxes
}

async function uniqueLogin(login) {
 return User.find({ login })
}

module.exports = {
 createDBUser,
 addMailboxToUser,
 getUsersActiveMailboxes
}