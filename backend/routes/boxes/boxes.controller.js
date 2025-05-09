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
 addMailboxToUser,
 getUsersActiveMailboxes,
 makeMailboxInactive
} = require('../../models/users.model')
const AppError = require('../../error/AppError')

async function createMailbox(req, res) {
 // запрос доступных доменов https://api.mail.tm/domains axios
 const { login, userId } = req.body

 // проверить сколько активных ящиков
 const { active_mailboxes: userActiveBoxes } = await getUsersActiveMailboxes(userId)
 if (userActiveBoxes.length >= 2) {
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
 const activation_date = new Date(account.createdAt)

 // получаем токен https://api.mail.tm/token
 const { token, errorGetToken } = await getToken(creds)
 if (errorGetToken) { throw errorGetToken }

 // создаем Mailbox
 const mailbox = await createMailboxDB({ userId, mailboxAddress, activation_date, token })

 // добавляем в active_mailboxes в User
 const user = await addMailboxToUser(userId, mailbox)

 // возвращаем User
 res.status(201).json({ message: 'allrighty then', user })
}

async function deactivateMailbox(req, res) {
 const { userId, mailboxId } = req.body
 console.log('DEBUG userId, mailboxId', userId, mailboxId)
 await makeMailboxInactive(userId, mailboxId)
 res.status(200).json({message: 'got it'})
}

// (mailboxId, userId) переместить удалить mailboxId из User.userId, добавить

module.exports = {
 createMailbox,
 deactivateMailbox
}