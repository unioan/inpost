const express = require('express');
const passport = require('passport');
const {
 createUser,
 loginStatusUser,
 logoutUser,
 authorizeUser
} = require('./users.controller');
const tryCatch = require('../../error/tryCatch');
const usersRouter = express.Router();

usersRouter.post('/register', tryCatch(createUser));
usersRouter.post('/login', passport.authenticate('local'), tryCatch(authorizeUser));
usersRouter.get('/login-status', tryCatch(loginStatusUser));
usersRouter.post('/logout', tryCatch(logoutUser))

module.exports = usersRouter