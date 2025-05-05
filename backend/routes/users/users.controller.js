const { createDBUser } = require('../../models/users.model')

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

module.exports = {
 createUser
}