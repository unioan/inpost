const MailboxList = require('./MailboxList')

async function createMailListIfNotExist(userId) {
 return await MailboxList.findByIdAndUpdate(userId, { userId }, { upsert: true, new: true })
}

async function addMailboxToActive(userId, mailbox) {
 return await MailboxList.findByIdAndUpdate(userId, { $push: { activeMailboxes: mailbox } })
}

async function getMailboxesListUpdated(userId) {
 const mailboxList = await MailboxList.findById(userId).populate('activeMailboxes')

 for (const mailbox of mailboxList.activeMailboxes.toObject()) {
  const expiresAt = new Date(mailbox.expiresAt)
  const now = new Date();

  if (now > expiresAt) {
   mailbox.isActive = false
   mailboxList.activeMailboxes.pull(mailbox._id);
   mailboxList.inactiveMailboxes.addToSet(mailbox);
  }
 }

 await mailboxList.save()

 return mailboxList
}

async function getMailboxesListSorted(userId) {
 const mailbox = await MailboxList.findById(userId).populate('inactiveMailboxes').populate('activeMailboxes');
 mailbox.inactiveMailboxes.sort((mailbox1, mailbox2) => {
  return new Date(mailbox2.expiresAt) - new Date(mailbox1.expiresAt)
 })
 mailbox.activeMailboxes.sort((mailbox1, mailbox2) => {
  return new Date(mailbox2.expiresAt) - new Date(mailbox1.expiresAt)
 })

 return mailbox
}

module.exports = {
 createMailListIfNotExist,
 addMailboxToActive,
 getMailboxesListUpdated,
 getMailboxesListSorted,
}