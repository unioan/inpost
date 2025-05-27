const passport = require('passport');
const { createDBUser } = require('../../models/users.model')
const AppError = require('../../error/AppError');
const UNAUTHENTICATED_ERROR = new AppError('auth', 401, 'You are not authorized')

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

function loginUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Authentication failed' });

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.status(200).json({
        message: 'Login successful',
        userId: user.id,
        login: user.login
      });
    });
  })(req, res, next);
}

function authorizeUser(req, res) {
  res.sendStatus(200)
}

function loginStatusUser(req, res) {
  if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
  res.send('Okay dude, you are AUTHENTICATED')
}

function logoutUser(req, res) {
  if (!req.isAuthenticated()) throw UNAUTHENTICATED_ERROR
  req.logout((error) => {
    if (error) throw new AppError('auth', 400, 'Unknown error during logout')
    res.sendStatus(200)
  })
}

module.exports = {
  createUser,
  loginStatusUser,
  logoutUser,
  authorizeUser,
  loginUser
}