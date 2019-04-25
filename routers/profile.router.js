const express = require("express");
const router = express.Router();

const passport = require("passport");

const ProfileControl = require("../controller/profile.control");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProfileControl.PasspostProfileAuth
);

router.get("/all", ProfileControl.AllProfiles);

router.get("/user/:user_id", ProfileControl.IdProfile);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProfileControl.InputProfile
);

module.exports = router;
