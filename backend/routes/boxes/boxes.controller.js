const { getDomain } = require('../../services/mailtm')
const {
 createDBUser,
 generateMailboxCredentials
} = require('../../models/boxes.model')

async function createUser(req, res) {
 try {
  await createDBUser(req.body)
  res.status(201).json({ message: 'User created', user: { ...req.body } });
 } catch (error) {
  switch (error.code) {
   case 400:
    res.status(400).json({ message: 'Please, choose different name', error });
    break;
   default:
    res.status(500).json({ message: 'ERROR when creating user ', error });
  }
 }
}

async function createMailbox(req, res) {
 // запрос доступных доменов
 // https://api.mail.tm/domains axios
 const domain = await getDomain()

 console.log(domain)


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
}

function getToken() {

}

function generateCredentials() {

}

module.exports = {
 getDomain,
 createUser,
 createMailbox
}