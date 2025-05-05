const { getDomain } = require('../../services/mailtm')
const { generateMailboxCredentials } = require('../../models/boxes.model')

async function createMailbox(req, res) {
 // запрос доступных доменов
 // https://api.mail.tm/domains axios
 const domain = await getDomain()

 // генерим
 // address_username@полученыйДомен
 // password
 const creds = generateMailboxCredentials('opanki.com')
 console.log('DEBUG: generateMailboxCredentials', creds)

 // создаем аккаунт
 // https://api.mail.tm/accounts

 // получаем токен
 // https://api.mail.tm/token

 // Создаем Mailbox создаем референс на него у User
 res.status(200).json({ message: 'allrighty then' })

 // после создания почтового ящика и получения токена нужно сохранить референс к нему в User. 
 // Как это сделать? Нужно вызвать API /users внутри /boxes
}

function getToken() {

}

function generateCredentials() {

}

module.exports = {
 createMailbox
}