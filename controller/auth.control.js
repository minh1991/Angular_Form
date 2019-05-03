const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const httpcodes = require('http-status-codes')
const validateSignUpInput = require('../supports/signUp.validate')
const validateLoginInput = require('../supports/login.validate')
const User = require('../models/user.model')
const db = require('../config/keys')

module.exports = {
  async CreateUser (req, res) {
    const { errors, isValid } = validateSignUpInput(req.body)
    console.log(isValid)
    if (!isValid) {
      // console.log({ message: errors });
      return res.status(httpcodes.BAD_REQUEST).json({ message: errors })
    }

    await User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res
          .status(httpcodes.BAD_REQUEST)
          .json({ message: 'Email đã tồn tại' })
      } else {
        return bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res
              .status(httpcodes.BAD_REQUEST)
              .json({ message: 'error password' })
          }
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
          })
          User.create(newUser)
            .then(user => {
              const token = jwt.sign({ data: user }, db.secret, {
                expiresIn: '2 days'
              })
              res.cookie('myToken', token)
              res
                .status(httpcodes.ACCEPTED)
                .json({ message: 'Đăng ký thành công', user, token })
            })
            .catch(err => {
              res
                .status(httpcodes.BAD_REQUEST)
                .json({ message: 'Đăng ký thất bại' })
              console.log(err)
            })
        })
      }
    })
  },

  async LoginUser (req, res) {
    console.log('login ' + req.body)
    const { errors, isValid } = validateLoginInput(req.body)
    console.log('isValid ' + isValid)
    if (!isValid) {
      return res.status(httpcodes.BAD_REQUEST).json(errors)
    }
    const email = req.body.email
    const password = req.body.password
    await User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = 'Email không tồn tại'
        return res.status(httpcodes.BAD_REQUEST).json(errors)
      } else {
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return res
              .status(httpcodes.BAD_REQUEST)
              .json({ message: 'Sai password' })
          } else {
            const payLoad = {
              id: user.id,
              username: user.username
            }
            jwt.sign(
              payLoad,
              db.secret,
              { expiresIn: '2 days' },
              (err, token) => {
                if (err) throw err
                res.status(httpcodes.ACCEPTED).json({
                  success: true,
                  token: 'bearer ' + token
                })
              }
            )
          }
        })
      }
    })
  },

  async PassportAuth (req, res) {
    return res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    })
  }
}
