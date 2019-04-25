// đường dẫn tới module mongoose
const mongoose = require("mongoose");

// Cấu hình các trường db
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  fullname: {
    type: String,
    required: true,
    max: 40,
    trim: true
  },
  gender: {
    type: Boolean,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
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
  work: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  imgULR: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// exports model ra để sử dụng
const Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;
