//  load packages
const express = require('express')
//  invoke express Router functionality
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

//  controllers
const commentCtrl = require('../controllers/comment')

//  routers

//export to server
module.exports = router
