const validateProfileInput = require("../supports/profile.validate");
const httpcodes = require("http-status-codes");
const Profile = require("../models/profile.modal");
const InputProfileFields = require("../supports/profileFields.input");

module.exports = {
  // AUTH
  async PasspostProfileAuth(req, res) {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["username", "email"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "Không có hồ sơ của người dùng này";
          return res.status(httpcodes.NOT_FOUND).json(errors);
        } else {
          return res.status(httpcodes.ACCEPTED).json(profile);
        }
      })
      .catch(err => {
        return res.status(httpcodes.NOT_FOUND).json(err);
      });
  },

  //SHOW ALL
  async AllProfiles(req, res) {
    const errors = {};
    console.log(errors);
    Profile.find()
      .populate("user", ["username", "email"])
      .then(profile => {
        console.log(profile);
        if (!profile) {
          errors.noProfile = "Không có hồ sơ";
          return res.status(httpcodes.NOT_FOUND).json(errors);
        } else {
          return res.status(httpcodes.ACCEPTED).json(profile);
        }
      })
      .catch(err => {
        console.log(err);
        return res
          .status(httpcodes.NOT_FOUND)
          .json({ profile: "Profile All errors" });
      });
  },

  // SHOW ID
  async IdProfile(req, res) {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
      .populate("user", ["username", "email"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "Không có hồ sơ người dùng này";
          return res.status(httpcodes.NOT_FOUND).json(errors);
        } else {
          return res.status(httpcodes.ACCEPTED).json(profile);
        }
      })
      .catch(err => {
        console.log(err);
        return res
          .status(httpcodes.NOT_FOUND)
          .json({ profile: "Không có hồ sơ người dùng này" });
      });
  },

  // INPUT PROFILE
  async InputProfile(req, res) {
    const { errors, isValid } = validateProfileInput(req.body);
    const inputFields = InputProfileFields(req.body, req.user.id);
    if (!isValid) {
      return res.status(httpcodes.BAD_REQUEST).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      // UPDATE
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: inputFields },
          { new: true }
        )
          .then(profile => {
            return res
              .status(httpcodes.ACCEPTED)
              .json({ message: "Update Profile thành công", profile });
          })
          .catch(err => {
            console.log(`lỗi update ${err}`);
            return res
              .status(httpcodes.BAD_REQUEST)
              .json({ profile: "Lỗi quá trình update" });
          });
      }
      //CREATE
      else {
        Profile.findOne({ user: req.user.id }).then(profile => {
          if (profile) {
            errors.user = "đã tồn tại";
            res.status(httpcodes.BAD_REQUEST).json(errors);
          }
          console.log(inputFields);
          new Profile(inputFields)
            .save()
            .then(profile => {
              return res
                .status(httpcodes.ACCEPTED)
                .json({ message: "Create Profile thành công", profile });
            })
            .catch(err => {
              console.log(`save lỗi ${err}`);
              return res
                .status(httpcodes.BAD_REQUEST)
                .json({ profile: "Lỗi quá trình Save" });
            });
        });
      }
    });
  }
};