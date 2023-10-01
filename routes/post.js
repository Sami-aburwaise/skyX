//  load packages
const express = require('express')
const multer = require('multer')
//  invoke express Router functionality
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

//upload image

//  controllers
const postCtrl = require('../controllers/post')

//  routers
router.get('/post/create', postCtrl.post_create_get)
router.post('/post/create', postCtrl.post_create_post)
router.get('/', postCtrl.post_index_get)
router.get('/delete', postCtrl.post_delete_get)
router.post('/like', postCtrl.post_like_post)

//export to server
module.exports = router
