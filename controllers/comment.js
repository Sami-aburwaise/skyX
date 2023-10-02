//  load packages
const moment = require('moment')

//  import model
const { Post } = require('../models /Post')
const { User } = require('../models /User')
const {Comment} = require('../models /Comment')

//  API's

//  edit comment
exports.comment_update_post = (req, res) => {
  Comment.findByIdAndUpdate(req.query.id, req.body).then(()=>{
    res.redirect('back')
  }).catch((err)=>{
    console.log(err)
  })
}
