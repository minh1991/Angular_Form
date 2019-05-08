const validateProfileInput = require('../supports/profile.validate')
const upload = require('../supports/upload-img.multer')
const httpcodes = require('http-status-codes')
const Profile = require('../models/profile.modal')
const ObjectId = require('mongoose').Types.ObjectId
// const InputProfileFields = require("../supports/profileFields.input");

module.exports = {
  // SHOW ALL
  async AllProfiles(req, res) {
    const errors = {}
    console.log(errors)
    Profile.find((err, docs) => {
      if (!err) {
        return res.status(httpcodes.ACCEPTED).json(docs)
      } else {
        console.log('All profile errors: ' + JSON.stringify(err, undefined, 2))
        return res.status(httpcodes.BAD_REQUEST).json(err)
      }
    })
  },
  // INPUT PROFILE
  async InputProfile(req, res) {
    const { errors, isValid } = validateProfileInput(req.body)
    const inputFields = new Profile({
      fullname: req.body.fullname,
      gender: req.body.gender,
      birthday: req.body.birthday,
      address: req.body.address,
      phone: req.body.phone,
      degree: req.body.degree,
      salary: req.body.salary,
      skills: req.body.skills,
      worked: req.body.worked,
      status: req.body.status,
      // imgULR: req.body.imgULR
      // originalname: req.file.originalname,
      // uploadname: req.file.filename,
    })
    if (!isValid) {
      return res.status(httpcodes.BAD_REQUEST).json(errors)
    }
    inputFields.save((err, doc) => {
      if (!err) {
        return res.status(httpcodes.ACCEPTED).json(doc)
      } else {
        console.log(
          'Input profile errors: ' + JSON.stringify(err, undefined, 2)
        )
        return res.status(httpcodes.BAD_REQUEST).json(err)
      }
    })
  },


  // UPLOAD IMG
  async uploadImg(req, res) {
    upload(req, res, (err) => {
      if (err) {
        console.log(err)
        return res.status(httpcodes.BAD_REQUEST).json({ errors: [{ title: 'File Upload Error', detail: err.message }] })
      }
      console.log(req.file)
      return res.status(httpcodes.ACCEPTED).json({ 'image': req.file.filename })
    })
  },


  // SHOW ID
  async IdProfile(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(httpcodes.BAD_REQUEST)
        .json(`không có id: ${req.params.id}`)
    } else {
      Profile.findById(req.params.id, (err, doc) => {
        if (!err) {
          return res.status(httpcodes.ACCEPTED).json(doc)
        } else {
          console.log(
            'ID profile errors: ' + JSON.stringify(err, undefined, 2)
          )
          return res.status(httpcodes.BAD_REQUEST).json(err)
        }
      })
    }
  },

  async updateProfile(req, res) {



    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(httpcodes.BAD_REQUEST)
        .json(`không có id: ${req.params.id}`)
    } else {
      const inputFields = {
        fullname: req.body.fullname,
        gender: req.body.gender,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        degree: req.body.degree,
        salary: req.body.salary,
        skills: req.body.skills,
        worked: req.body.worked,
        status: req.body.status,
        // imgULR: req.body.imgULR
      }
      Profile.findByIdAndUpdate(
        req.params.id,
        { $set: inputFields },
        { new: true },
        (err, doc) => {
          if (!err) {
            return res.status(httpcodes.ACCEPTED).json(doc)
          } else {
            console.log(
              'Update profile errors: ' + JSON.stringify(err, undefined, 2)
            )
            return res.status(httpcodes.BAD_REQUEST).json(err)
          }
        }
      )
    }
  },

  async deleteProfile(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(httpcodes.BAD_REQUEST)
        .json(`không có id: ${req.params.id}`)
    } else {
      Profile.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
          return res.status(httpcodes.ACCEPTED).json(doc)
        } else {
          console.log(
            'Delete profile errors: ' + JSON.stringify(err, undefined, 2)
          )
          return res.status(httpcodes.BAD_REQUEST).json(err)
        }
      })
    }
  }
}
