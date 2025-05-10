const {
  createDBUser,
  getUsersActiveMailboxes
} = require('../../models/users.model')
const { differenceInMinutes, addMinutes } = require('date-fns');
require('dotenv').config()

const MAILBOX_EXPIRATION_TIME = process.env.MAILBOX_EXPIRATION_TIME

async function createUser(req, res) {
  try {
    const user = await createDBUser(req.body)
    res.status(201).json({ message: 'User created', user });
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

// /users/:userId
// Выделить проверку, обработку ящиков в отдельную функцию
async function getUser(req, res) {
  const { userId } = req.params
  const { active_mailboxes: activeBoxes } = await getUsersActiveMailboxes(userId)

  activeBoxes.forEach(box => {
    const { activation_date } = box
    console.log('DEBUG activation_date:', activation_date)
    const now = new Date();
    const minutesPast = differenceInMinutes(now, activation_date)
    const expirationDate = addMinutes(activation_date, MAILBOX_EXPIRATION_TIME)

    if (minutesPast > MAILBOX_EXPIRATION_TIME) {
      console.log('DEBUG expiration date', expirationDate)
      console.log('DEBUG minutesPast', minutesPast)
    } else {
      console.log('DEBUG expiration date', expirationDate)
      console.log('DEBUG minutesPast', minutesPast)
    }

    console.log('DEBUG minutesPast:', minutesPast)
  });

  console.log('UTC time', new Date().toISOString())

  res.status(200).json({ message: 'getUser returned' })
}

module.exports = {
  createUser,
  getUser
}