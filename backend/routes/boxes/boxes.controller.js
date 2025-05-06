const { getDomain, createAccount, getToken } = require('../../services/mailtm')
const { createMailboxDB, generateAddressAndPassword } = require('../../models/boxes.model')
const { addMailboxToUser } = require('../../models/users.model')

async function createMailbox(req, res) {
 // запрос доступных доменов
 // https://api.mail.tm/domains axios
 const domain = await getDomain()

 // генерим
 // address_username@полученыйДомен
 // password
 // const creds = generateAddressAndPassword('opanki.com')
 const creds = { address: `opanki-again1@${domain}`, password: '123321abc' }
 console.log('DEBUG: generateMailboxCredentials', creds)

 // создаем аккаунт
 // https://api.mail.tm/accounts
 //const account = await createAccount(creds)
 //console.log(account, account.status)

 // const id = account.data.id
 // const mailboxAddress = account.data.address
 // const activation_date = new Date(account.data.createdAt)

 const id = '681a355699071dca790804ce'
 const mailboxAddress = 'opanki-again1@chefalicious.com'
 const activation_date = new Date('2025-05-06T16:14:14+00:00')

 // получаем токен
 // https://api.mail.tm/token
 const token = await getToken(creds)

 const mailbox = await createMailboxDB({ id, mailboxAddress, activation_date, token })

 console.log('DEBUG: token', token)
 console.log('DEBUG: mailbox', mailbox)

 const result = await addMailboxToUser('6818f0f1491fcdde5f7075f8', mailbox)

 console.log('DEBUG: result', result)

 // Создаем Mailbox создаем референс на него у User
 res.status(200).json({ message: 'allrighty then' })

 // после создания почтового ящика и получения токена нужно сохранить референс к нему в User. 
 // Как это сделать? Нужно вызвать API /users внутри /boxes ?
}

module.exports = {
 createMailbox
}