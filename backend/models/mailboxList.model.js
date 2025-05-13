require('dotenv').config()
const MailboxList = require('./MailboxList')
const AppError = require('../error/AppError')

const MAILBOX_MAX_ACTIVE = process.env.MAILBOX_MAX_ACTIVE || 2

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

function checkMaxActiveRestriction(mailboxList) {
 console.log('DEBUG mailboxList: ', mailboxList)
 if (mailboxList.activeMailboxes.length >= MAILBOX_MAX_ACTIVE) {
  return {
   errorMaxActiveReached: new AppError(
    'app',
    403,
    'You are not allowed to have more than 2 active mailboxes'
   )
  }
 }
 return { errorMaxActiveReached: null }
}

module.exports = {
 createMailListIfNotExist,
 addMailboxToActive,
 getMailboxesListUpdated,
 getMailboxesListSorted,
 checkMaxActiveRestriction
}