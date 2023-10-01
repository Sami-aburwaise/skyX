const express = require('express')
const router = express.Router()
const multer = require('multer')
router.use(express.urlencoded({ extended: true }))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/profilePic')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
var upload = multer({
  storage: storage
}).single('profilePic')

//  controllers
const userCtrl = require('../controllers/user')
//  routes
router.get('/user/signup', userCtrl.user_signup_get)
router.post('/user/signup', upload, userCtrl.user_signup_post)
router.get('/user/signin', userCtrl.user_signin_get)
router.post('/user/signin', userCtrl.user_signin_post)
router.get('/user/logOut', userCtrl.user_logout_get)
router.get('/user/profile', userCtrl.profile_show_get)
router.get('/user/edit', userCtrl.profile_edit_get)
router.post('/user/edit', userCtrl.profile_edit_post)
//export to server
module.exports = router
