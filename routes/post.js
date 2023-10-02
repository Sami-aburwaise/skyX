//  load packages
const express = require('express')
const multer = require('multer')
//  invoke express Router functionality
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
//Require Is loggedIn middleware
const isLoggedin = require('../helper/isLoggedin')
//upload image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/postImages')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
var upload = multer({
  storage: storage
}).single('path')
//  controllers
const postCtrl = require('../controllers/post')

//  routers
router.get('/post/create', isLoggedin, postCtrl.post_create_get)
router.post('/post/create', upload, postCtrl.post_create_post)
router.get('/', postCtrl.post_index_get)
router.get('/post/detail', postCtrl.post_detail_get)
router.get('/post/edit', postCtrl.post_edit_get)
router.post('/post/update', postCtrl.post_updete_post)
router.get('/post/delete', postCtrl.post_delete_get)
router.post('/like', postCtrl.post_like_post)
router.post('/comment/add', postCtrl.comment_add_post)

//export to server
module.exports = router
