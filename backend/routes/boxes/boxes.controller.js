const { getDomain, createAccount, getToken } = require('../../services/mailtm')
const { createMailboxDB, generateMailboxAddressAndPassword } = require('../../models/boxes.model')
const { addMailboxToUser } = require('../../models/users.model')
const AppError = require('../../error/AppError')

async function createMailbox(req, res) {
 // запрос доступных доменов https://api.mail.tm/domains axios
 const { login, userId } = req.body
 const domain = await getDomain()
 if (!domain) { throw new AppError('mailtm', 500, `mail.tm returned: ${domain} (no domain)`) }

 // генерим address_username@domain => {address, password}
 const creds = generateMailboxAddressAndPassword(login, domain)

 console.log('DEBUG creds:', creds)

 // создаем аккаунт https://api.mail.tm/accounts
 const { error, account } = await createAccount(creds)
 if (error) { throw error }

 const mailboxAddress = account.address
 const activation_date = new Date(account.createdAt)

 // получаем токен https://api.mail.tm/token
 const token = await getToken(creds)

 // создаем Mailbox
 const mailbox = await createMailboxDB({ userId, mailboxAddress, activation_date, token })

 // добавляем в active_mailboxes в User
 const user = await addMailboxToUser(userId, mailbox)

 console.log('DEBUG: user', user)

 // Создаем Mailbox создаем референс на него у User
 res.status(201).json({ message: 'allrighty then', user })

 // после создания почтового ящика и получения токена нужно сохранить референс к нему в User. 
 // Как это сделать? Нужно вызвать API /users внутри /boxes ?
}

module.exports = {
 createMailbox
}