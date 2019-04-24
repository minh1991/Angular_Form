const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpcodes = require("http-status-codes");
const validateSignUpInput = require("../supports/signUp.validate");
const User = require("../models/user.model");
const db = require("../config/keys");

module.exports = {
  async CreateUser(req, res) {
    console.log("body " + req.body);
    const { errors, isValid } = validateSignUpInput(req.body);
    console.log("isValid " + isValid);
    if (!isValid) {
      return res.status(httpcodes.BAD_REQUEST).json(errors);
    }

    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      return res
        .status(httpcodes.BAD_REQUEST)
        .json({ message: "Email đã tồn tại" });
    }

    const userUsername = await User.findOne({ username: req.body.username });
    if (userUsername) {
      return res
        .status(httpcodes.BAD_REQUEST)
        .json({ message: "Username đã tồn tại" });
    }

    return bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res
          .status(httpcodes.BAD_REQUEST)
          .json({ message: "error password" });
      }
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      User.create(newUser)
        .then(user => {
          const token = jwt.sign({ data: user }, db.secret, {
            expiresIn: "2 days"
          });
          res.cookie("myToken", token);
          res
            .status(httpcodes.ACCEPTED)
            .json({ message: "Đăng ký thành công", user, token });
        })
        .catch(err => {
          res
            .status(httpcodes.BAD_REQUEST)
            .json({ message: "Đăng ký thất bại" });
          console.log(err);
        });
    });
  },

  async LoginUser(req, res) {
    console.log("login " + req.body);
  }
};
