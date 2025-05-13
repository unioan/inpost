require('dotenv').config()
const {
 getDomain,
 createAccount,
 getToken
} = require('../../services/mailtm')
const {
 createMailboxDB,
 generateMailboxAddressAndPassword
} = require('../../models/boxes.model')
const {
 createMailListIfNotExist,
 addMailboxToActive,
 getMailboxesListSorted,
 getMailboxesListUpdated
} = require('../../models/mailboxList.model')
const AppError = require('../../error/AppError')

const MAILBOX_MAX_ACTIVE = process.env.MAILBOX_MAX_ACTIVE || 2


async function createMailbox(req, res) {
 // запрос доступных доменов https://api.mail.tm/domains axios
 const { login, userId } = req.body

 // создать пользователя в MailboxList
 await createMailListIfNotExist(userId)

 // обновить переред проверкой коичества => вернет актуальные активные
 const userActiveMailboxes = await getMailboxesListUpdated(userId)
 console.log('DEBUG updateActiveMailboxesStatus:', userActiveMailboxes)

 // перенести в Malboxes
 if (userActiveMailboxes.activeMailboxes.length >= MAILBOX_MAX_ACTIVE) {
  throw new AppError('app', 403, 'You are not allowed to have more than 2 active mailboxes')
 }

 const { domain, errorGetDomain } = await getDomain()
 if (errorGetDomain) { throw errorGetDomain }

 // генерим address_username@domain => {address, password}
 const creds = generateMailboxAddressAndPassword(login, domain)

 // создаем аккаунт https://api.mail.tm/accounts
 const { mailtmAccount, errorCreateAccount } = await createAccount(creds) 
 if (errorCreateAccount) { throw errorCreateAccount }

 // console.log('DEBUG current UTC time', new Date().toISOString())

 // получаем токен https://api.mail.tm/token
 const { token, errorGetToken } = await getToken(creds)
 if (errorGetToken) { throw errorGetToken }

 // создаем Mailbox
 const mailbox = await createMailboxDB(userId, mailtmAccount, token)

 // добавляем в MailboxList в активные
 await addMailboxToActive(userId, mailbox)

 // возвращаем User
 res.status(201).json({ message: 'allrighty then' })
}

async function getMailboxes(req, res) {
 const { userId } = req.params
 await getMailboxesListUpdated(userId)
 const mailboxList = await getMailboxesListSorted(userId) // может адаптировать updateActiveMailboxesStatus возвращать mailboxList чтобы 2 раза в базу не ходить
 res.status(200).json(mailboxList)
}



module.exports = {
 createMailbox,
 getMailboxes,
}