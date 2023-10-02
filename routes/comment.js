//  load packages
const express = require('express')
//  invoke express Router functionality
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

//  controllers
const commentCtrl = require('../controllers/comment')

//  routers
router.use('/comment/update', commentCtrl.comment_update_post)
router.use('/comment/delete', commentCtrl.comment_delete_get)

//export to server
module.exports = router
