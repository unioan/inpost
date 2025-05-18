const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../models/User')
const AppError = require('../error/AppError');

// Здесь мы определили наш middleware, где теперь его регать?
// После имплементации мы получим ошибку: UNEXPECTED aka opanki: Error: Failed to serialize user into session.
passport.use(
  // в первом параметре можно переименовать uesername, password если названия этих полей отличаются в request, тогда параметры с нужными именами будут замаплены в callback (uesername, password, done) => {}
  new Strategy({ usernameField: 'login' }, async (uesername, password, done) => {
    // здесь происходит проверка переданных данных с данными в DB 
    try {
      const findUser = await User.findOne({ login: uesername })
      if (!findUser) throw new AppError('auth', 400, 'No such account')
      if (findUser.password != password) throw new AppError('auth', 400, 'Wrong username or password')
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
    const findUser = await User.findById(id)
    if (!findUser) throw new AppError('auth', 400, 'deserializeUser failed')
    done(null, findUser) // добавит user в request
  } catch (error) {
    done(error, null)
  }
})