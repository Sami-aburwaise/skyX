//  load packages
const multer = require('multer')

//  import model
const { Post } = require('../models /Post')
const { User } = require('../routes/user')


//  API's

//  create post

exports.post_create_get = (req, res) => {
  res.render('post/create')
}

exports.post_create_post = (req, res) => {
  let post = new Post(req.body)
  if (typeof req.file !== 'undefined') {
    post.profilePic = 'post_images/' + req.file.filename
  }
  post
    .save()
    .then(() => {
      console.log('saved to mongoDB')
      //add user id

      //redirect to home page
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

//  show feed or all post, index page
exports.post_index_get = (req, res) => {
  //  NOTE: add populate when user and comment models are added
  Post.find()
    .then((posts) => {
      res.render('post/index', { posts })
    })
    .catch((err) => {
      console.log('couldnt find posts' + err)
    })
}

//  view my post

//  edit post

//  delete post
exports.post_delete_get = async (req, res) => {
  const post = await Post.findById(req.query.id).populate()
  if (post.user == res.locals.currentUser.id) {
    Post.deleteOne(post)
      .then()
      .catch((err) => {
        console.log('cuoldnt delete error: ' + err)
      })
  }
  res.redirect('back')
}

//  like post
exports.post_like_post = async (req, res) => {
  const post = await Post.findById(req.query.id)
  if (post.likes.includes(res.locals.currentUser.id)) {
    res.redirect('back')
    return
  }
  post
    .updateOne({
      $push: { likes: res.locals.currentUser }
    })
    .then(() => {
      res.redirect('back')
    })
    .catch((err) => {
      console.log('err')
    })
}
