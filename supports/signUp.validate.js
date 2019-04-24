const validator = require("validator");
const isEmpty = require("./isEmpty.validate");

module.exports = function validateSignUpInput(data) {
  let errors = {};

  if (!isEmpty(data.username)) {
    data.username = data.username;
  } else {
    data.username = "";
  }

  if (!isEmpty(data.email)) {
    data.email = data.email;
  } else {
    data.email = "";
  }

  if (!isEmpty(data.password)) {
    data.password = data.password;
  } else {
    data.password = "";
  }

  // VALIDATE USERNAME
  if (validator.isEmpty(data.username)) {
    errors.username = "Username không được bỏ trống";
  }
  if (!validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username phải dài từ 2 ký tự đến 30 ký tự";
  }

  // VALIDATE EMAIL
  if (validator.isEmpty(data.email)) {
    // console.log(data.email);
    errors.email = "Email không được bỏ trống";
  }
  if (!validator.isEmail(data.email)) {
    // console.log(data.email);
    errors.email = "Email không hợp lệ";
  }

  // VALIDATE PASSWORD
  if (validator.isEmpty(data.password)) {
    errors.password = "Password không được bỏ trống";
  }
  if (!validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "Password dài từ 5 đến 30 ký tự";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
