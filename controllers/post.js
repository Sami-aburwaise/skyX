//  import model
const { Post } = require('../models/Post')

//  API's

//  create post 

exports.post_create_get = (req, res) => {
  res.render('post/create')
}

exports.post_create_post = (req, res) => {
  //  send to DB
  console.log(req.body)
  let post = new Post(req.body)
  post
    .save()
    .then(() => {
      console.log('saved to mongoDB')
      //add user id

      //redirect to home page
      res.render('post/create')
    })
    .catch((err) => {
      console.log(err)
    })
}

//  view post



//  edit post


//  update post

