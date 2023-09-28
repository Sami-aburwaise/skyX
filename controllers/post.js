//  import model
const { Post } = require('../models/Post')

//  API's

//  add post
exports.post_create_get = (req, res) => {
  res.render('post/create')
}

exports.post_create_post = (req, res) => {
  //  send to DB
}
