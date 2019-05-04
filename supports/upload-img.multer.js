const multer = require('multer')


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('chỉ tải định dạng jpeg hoặc png'), false)
    }
}

const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../upload-img')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})
const upload = multer({ fileFilter, storage: store }).single('file')

module.exports = upload
