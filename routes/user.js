const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))

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

//  controllers
const userCtrl = require('../controllers/user')

//  routes
router.get('/user/signup', userCtrl.user_signup_get)
router.post('/user/signup', userCtrl.user_signup_post)
router.get('/user/signin', userCtrl.user_signin_get)
router.post('/user/signin', userCtrl.user_signin_post)

//export to server
module.exports = router
