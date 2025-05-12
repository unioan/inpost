require('dotenv').config()
const {
 getDomain,
 createAccount,
 getToken
} = require('../../services/mailtm')
const {
 createMailboxDB,
 generateMailboxAddressAndPassword,
 renameFieldCreateAt
} = require('../../models/boxes.model')
const {
 createMailListIfNotExist,
 getActiveMailboxes,
 addMailboxToActive,
 getMailboxesList,
 updateActiveMailboxesStatus,
 makeExpiresAtMailboxesList
} = require('../../models/mailboxList.model')
const AppError = require('../../error/AppError')
const { addMinutes } = require('date-fns');

const MAILBOX_MAX_ACTIVE = process.env.MAILBOX_MAX_ACTIVE || 2
const MAILBOX_EXPIRATION_TIME = process.env.MAILBOX_EXPIRATION_TIME || 10

async function createMailbox(req, res) {
 // запрос доступных доменов https://api.mail.tm/domains axios
 const { login, userId } = req.body

 // создать пользователя в MailboxList
 await createMailListIfNotExist(userId)

 // обновить переред проверкой коичества => вернет актуальные активные
 const userActiveMailboxes = await updateActiveMailboxesStatus(userId)
 console.log('DEBUG updateActiveMailboxesStatus:', userActiveMailboxes)

 if (userActiveMailboxes.length >= MAILBOX_MAX_ACTIVE) {
  throw new AppError('app', 403, 'You are not allowed to have more than 2 active mailboxes')
 }

 const { domain, errorGetDomain } = await getDomain()
 if (errorGetDomain) { throw errorGetDomain }

 // генерим address_username@domain => {address, password}
 const creds = generateMailboxAddressAndPassword(login, domain)

 // создаем аккаунт https://api.mail.tm/accounts
 const { account, errorCreateAccount } = await createAccount(creds)
 if (errorCreateAccount) { throw errorCreateAccount }

 const mailboxAddress = account.address
 const expiresAt = addMinutes(new Date(account.createdAt), MAILBOX_EXPIRATION_TIME) 

 console.log('DEBUG current UTC time', new Date().toISOString())

 // получаем токен https://api.mail.tm/token
 const { token, errorGetToken } = await getToken(creds)
 if (errorGetToken) { throw errorGetToken }

 // создаем Mailbox
 const mailbox = await createMailboxDB({ userId, mailboxAddress, expiresAt, token })

 // добавляем в MailboxList в активные
 const addMailboxResult = await addMailboxToActive(userId, mailbox)
 // console.log('DEBUG addMailboxResult: ', addMailboxResult)

 // возвращаем User
 res.status(201).json({ message: 'allrighty then' })
}

async function getMailboxes(req, res) {
 const { userId } = req.params
 await updateActiveMailboxesStatus(userId)
 const mailboxList = await getMailboxesList(userId) // может адаптировать updateActiveMailboxesStatus возвращать mailboxList чтобы 2 раза в базу не ходить
 res.status(200).json(mailboxList)
}

async function changeField(req, res) {
 const { userId } = req.body
 await makeExpiresAtMailboxesList(userId)
 res.status(200).json({message: 'ok'})
}

module.exports = {
 createMailbox,
 getMailboxes,
 changeField
}