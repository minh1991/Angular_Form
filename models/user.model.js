// đường dẫn tới module mongoose
const mongoose = require('mongoose')

// Cấu hình các trường db
const UserSchema = new mongoose.Schema({
  // my props
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// exports model ra để sử dụng
const User = mongoose.model('users', UserSchema)
module.exports = User
