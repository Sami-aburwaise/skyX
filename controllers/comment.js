//  load packages
const moment = require('moment')

//  import model
const { Post } = require('../models /Post')
const { User } = require('../models /User')
const {Comment} = require('../models /Comment')

//  API's

//  create comment
exports.comment_add_post = (req, res) => {
  let comment = new Comment(req.body)
  comment
    .save()
    .then(() => {
      console.log('posted comment')
    })
    .catch((err) => {
      console.log(err)
    })
  res.redirect('back')
}

//  edit comment
exports.comment_edit_get = (req, res) => {}

exports.comment_update_post = (req, res) => {}
