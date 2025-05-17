const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../models/User')

// Здесь мы определили наш middleware, где теперь его регать?
passport.use(
 // в первом параметре можно переименовать uesername, password если названия этих полей отличаются в request, тогда параметры с нужными именами будут замаплены в callback (uesername, password, done) => {}
 new Strategy({ usernameField: 'login' }, async (uesername, password, done) => {
  // здесь происходит проверка переданных данных с данными в DB 
  console.log('DEBUG uesername (login) param from Strategy:', uesername)
  console.log('DEBUG password from Strategy:', password)
  try {
   const findUser = await User.findOne({ login: uesername })
   console.log('DEBUG findUser:', findUser)
   if (!findUser) throw new Error('no such account')
   if (findUser.password != password) throw new Error('wrong password')
   done(null, findUser)
  } catch (error) {
   done(error, null)
  }
 })
)