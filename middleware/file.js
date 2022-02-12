const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public')
    },
    filename(req, file, cb) {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (require, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, false)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage, fileFilter
})