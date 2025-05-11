const MailboxList = require('./MailboxList')
const { differenceInMinutes } = require('date-fns');

const MAILBOX_EXPIRATION_TIME = process.env.MAILBOX_EXPIRATION_TIME

async function createMailListIfNotExist(userId) {
 return await MailboxList.findByIdAndUpdate(userId, { userId }, { upsert: true, new: true })
}

async function getMailboxes(userId) {
 return await MailboxList.findById(userId)
}

async function getActiveMailboxes(userId) {
 const { activeMailboxes } = await MailboxList.findById(userId, { activeMailboxes: 1 })
 return activeMailboxes
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
   mailboxList.activeMailboxes.pull(mailbox._id);
   mailboxList.inactiveMailboxes.addToSet(mailbox);
  } 
 }

 await mailboxList.save()
}

module.exports = {
 createMailListIfNotExist,
 getActiveMailboxes,
 addMailboxToActive,
 updateActiveMailboxesStatus
}