const express = require('express')
const router = express.Router()
const passport = require('passport')
const AuthControl = require('../controller/auth.control')

router.post('/signup', AuthControl.CreateUser)
router.post('/login', AuthControl.LoginUser)
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  AuthControl.PassportAuth
)

module.exports = router
