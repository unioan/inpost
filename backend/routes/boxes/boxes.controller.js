const { getDomain, createAccount, getToken } = require('../../services/mailtm')
const { createMailboxDB, generateMailboxAddressAndPassword } = require('../../models/boxes.model')
const { addMailboxToUser } = require('../../models/users.model')
const AppError = require('../../error/AppError')

async function createMailbox(req, res) {
 // запрос доступных доменов https://api.mail.tm/domains axios
 const { login, userId } = req.body
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

module.exports = {
 createMailbox
}