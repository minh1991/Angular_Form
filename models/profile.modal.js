// đường dẫn tới module mongoose
const mongoose = require('mongoose')

// Cấu hình các trường db
const ProfileSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "users"
  // },
  fullname: {
    type: String,
    required: true,
    min: 2,
    max: 40,
    trim: true
  },
  gender: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true,
    default: Date.now
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  worked: {
    required: true,
    type: String
    // id: {
    //   type: String
    // },
    // comment: {
    //   type: String
    // }
  },
  status: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// exports model ra để sử dụng
const Profile = mongoose.model('profile', ProfileSchema)
module.exports = Profile
