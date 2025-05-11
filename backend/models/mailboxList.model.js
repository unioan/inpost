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
 const mailboxList = await MailboxList.findById(userId)

 for (const mailbox of mailboxList.activeMailboxes.toObject()) {
  const { activation_date } = mailbox;
  const now = new Date();
  const minutesPast = differenceInMinutes(now, activation_date);

  if (minutesPast > MAILBOX_EXPIRATION_TIME) {
   mailbox.isActive = false
   mailboxList.activeMailboxes.pull(mailbox._id);
   mailboxList.inactiveMailboxes.addToSet(mailbox);
  }
 }

 await mailboxList.save()

 return mailboxList.activeMailboxes
}

async function getMailboxesList(userId) {
 const mailbox = await MailboxList.findById(userId)
 mailbox.inactiveMailboxes.sort((mailbox1, mailbox2) => {
  return new Date(mailbox2.activation_date) - new Date(mailbox1.activation_date)
 })
 mailbox.activeMailboxes?.sort((mailbox1, mailbox2) => {
  return new Date(mailbox2.activation_date) - new Date(mailbox1.activation_date)
 })

 return mailbox
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
 getActiveMailboxes
}