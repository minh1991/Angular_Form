const express = require("express");
const router = express.Router();

const AuthControl = require("../controller/auth.control");

router.post("/signup", AuthControl.CreateUser);
router.post("/login", AuthControl.LoginUser);

module.exports = router;
