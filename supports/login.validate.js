const validator = require('validator')
const isEmpty = require('./isEmpty.validate')

module.exports = function validateLoginInput (data) {
  let errors = {}

  if (!isEmpty(data.email)) {
    data.email = data.email
  } else {
    data.email = ''
  }
  if (!isEmpty(data.password)) {
    data.password = data.password
  } else {
    data.password = ''
  }

  // // VALIDATE EMAIL
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email không hợp lệ'
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email không được bỏ trống'
  }
  // // END VALIDATE EMAIL

  // // VALIDATE PASSWORD
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password không được bỏ trống'
  }
  // // END VALIDATE PASSWORD

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
