const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../models/User')

// Здесь мы определили наш middleware, где теперь его регать?
// После имплементации мы получим ошибку: UNEXPECTED aka opanki: Error: Failed to serialize user into session.
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

// passport.serializeUser получает User из request который попал туда через done(null, findUser) в passport.use(). Теперь serializeUser, сохраняет User в сессию. 
// serializeUser вызывается один раз при логине создает сессию, выдает cookie. После будет вызываться deserializeUser
passport.serializeUser((user, done) => {
 // id будет зашит в сессии / кукки
 done(null, user.id) // срабатывает callback в app.use('/auth', passport.authenticate('local'), callback)
})

// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
// https://prnt.sc/IxaHWq62NfYv
// Здесь мы находим пользователя по сессии
passport.deserializeUser(async (id, done) => {
 try {
  console.log('DEBUG deserializeUser id :', id)
  const findUser = await User.findById(id)
  if (!findUser) throw new Error('couldn\'t deserialize')
   done(null, findUser) // добавит user в request
 } catch (error) {
  done(error, null)
 }
})