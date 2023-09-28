//  load express package
const express = require('express')

//  invoke express Router functionality
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

//  controllers
const postCtrl = require('../controllers/post')

//  routers
router.get('/post/create', postCtrl.post_create_get)
router.post('/post/create', postCtrl.post_create_post)
router.get('/', postCtrl.post_index_get)

//export to server
module.exports = router
