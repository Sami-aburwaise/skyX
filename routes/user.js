const express = require('express')
const router = express.Router()
// const multer = require('multer')
// const path = require('path')
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images')
//   },
//   filename: (req, file, cb) => {
//     console.log(file)
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })
//const upload = multer({ storage: storage })
const userCtrl = require('../controllers/user')
router.use(express.urlencoded({ extended: true }))
router.get('/user/signup', userCtrl.user_signup_get)
router.post('/user/signup', userCtrl.user_signup_post)
module.exports = router
