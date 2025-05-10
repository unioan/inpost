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

async function getDBUser(userId) {
 return await User.findById(userId)
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
 const activeMailboxes = await User.findById(userId, { active_mailboxes: 1 }).populate('active_mailboxes')
 return activeMailboxes
}

async function makeMailboxInactive(userId, mailboxId) {
 const user = await User.findById(userId);

 user.active_mailboxes.pull(mailboxId);
 user.inactive_mailboxes.addToSet(mailboxId);

 await user.save();
}

async function uniqueLogin(login) {
 return User.find({ login })
}

module.exports = {
 createDBUser,
 addMailboxToUser,
 getUsersActiveMailboxes,
 makeMailboxInactive
}