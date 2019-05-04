const express = require('express')
const router = express.Router()
const ProfileControl = require('../controller/profile.control')




router.get('/', ProfileControl.AllProfiles)
router.get('/:id', ProfileControl.IdProfile)
router.post('/', ProfileControl.InputProfile)
router.post('/upload-img', ProfileControl.uploadImg)
router.put('/update/:id', ProfileControl.updateProfile)
router.delete('delete/:id', ProfileControl.deleteProfile)

module.exports = router
