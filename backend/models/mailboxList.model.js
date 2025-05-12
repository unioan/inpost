const MailboxList = require('./MailboxList')
const Mailbox = require('./Mailbox')
const { differenceInMinutes } = require('date-fns');

const MAILBOX_EXPIRATION_TIME = process.env.MAILBOX_EXPIRATION_TIME

async function createMailListIfNotExist(userId) {
 return await MailboxList.findByIdAndUpdate(userId, { userId }, { upsert: true, new: true })
}

async function addMailboxToActive(userId, mailbox) {
 return await MailboxList.findByIdAndUpdate(userId, { $push: { activeMailboxes: mailbox } })
}

async function updateActiveMailboxesStatus(userId) {
 const mailboxList = await MailboxList.findById(userId).populate('activeMailboxes')
 console.log('DEBUG mailboxList', mailboxList)

 for (const mailbox of mailboxList.activeMailboxes.toObject()) {
  const expiresAt = new Date(mailbox.expiresAt)
  const now = new Date();
  const minutesPast = differenceInMinutes(now, expiresAt);

  if (now > expiresAt) {
   mailbox.isActive = false
   mailboxList.activeMailboxes.pull(mailbox._id);
   mailboxList.inactiveMailboxes.addToSet(mailbox);
  }
 }

 await mailboxList.save()

 return mailboxList.activeMailboxes
}

// дописать Sorted
async function getMailboxesList(userId) {
 const mailbox = await MailboxList.findById(userId)
 mailbox.inactiveMailboxes.sort((mailbox1, mailbox2) => {
  return new Date(mailbox2.expiresAt) - new Date(mailbox1.expiresAt)
 })
 mailbox.activeMailboxes?.sort((mailbox1, mailbox2) => {
  return new Date(mailbox2.expiresAt) - new Date(mailbox1.expiresAt)
 })

 return mailbox
}

async function makeExpiresAtMailboxesList(userId) {
 const mailboxes = await MailboxList.findOne({ userId })

 const objIdsMailboxes = mailboxes.activeMailboxes.map(box => box._id)
 mailboxes.activeMailboxes = objIdsMailboxes

 console.log('DEBUG objIdsMailboxes: ', objIdsMailboxes)

 await mailboxes.save()

 // const inactiveMailboxes = await mailboxes.populate('inactiveMailboxes')

 // console.log('DEBUG inactiveMailboxes: ', inactiveMailboxes)


 return mailboxes
}

async function getActiveMailboxes(userId) {
 const { activeMailboxes } = await MailboxList.findById(userId, { activeMailboxes: 1 })
 return activeMailboxes
}

module.exports = {
 createMailListIfNotExist,
 addMailboxToActive,
 updateActiveMailboxesStatus,
 getMailboxesList,
 getActiveMailboxes,
 makeExpiresAtMailboxesList
}