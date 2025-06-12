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
 getMailboxesListSorted,
 getMailboxesListUpdated,
 addMailboxToActive,
 checkMaxActiveRestriction
} = require('../../models/mailboxList.model')
const AppError = require('../../error/AppError');
const UNAUTHENTICATED_ERROR = new AppError('auth', 401, 'You are not authorized')

async function createMailbox(req, res) {
 if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
 const { id: userId, login } = req.user

 // создать пользователя в MailboxList
 await createMailListIfNotExist(userId)

 // обновить переред проверкой коичества => вернет актуальные активные
 const mailboxList = await getMailboxesListUpdated(userId)

 // перенести в Malboxes
 const { errorMaxActiveReached } = checkMaxActiveRestriction(mailboxList)
 if (errorMaxActiveReached) { throw errorMaxActiveReached }

 // запрос доступных доменов https://api.mail.tm/domains axios
 const { domain, errorGetDomain } = await getDomain()
 if (errorGetDomain) { throw errorGetDomain }

 // генерим address_username@domain => {address, password}
 const creds = generateMailboxAddressAndPassword(login, domain)

 // создаем аккаунт https://api.mail.tm/accounts
 const { mailtmAccount, errorCreateAccount } = await createAccount(creds)
 if (errorCreateAccount) { throw errorCreateAccount }

 // получаем токен https://api.mail.tm/token
 const { token, errorGetToken } = await getToken(creds)
 if (errorGetToken) { throw errorGetToken }

 // создаем Mailbox
 const mailbox = await createMailboxDB(userId, mailtmAccount, token)

 // добавляем в MailboxList в активные
 await addMailboxToActive(userId, mailbox)

 // возвращаем User
 res.status(201).json({ mailbox })
}

async function getMailboxes(req, res) {
 if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
 const { id: userId } = req.user
 await getMailboxesListUpdated(userId)
 const mailboxList = await getMailboxesListSorted(userId)
 res.status(200).json(mailboxList)
}

module.exports = {
 createMailbox,
 getMailboxes,
}