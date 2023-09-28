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

//  show feed or all post, index page
exports.post_index_get = (req, res)=>{
  //  NOTE: add populate when user and comment models are added
  Post.find().then((posts)=>{
    res.render('post/index', {posts})
  }).catch((err)=>{
    console.log('couldnt find posts' + err)
  })
}


//  view my post



//  edit post


//  update post

