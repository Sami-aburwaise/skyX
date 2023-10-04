//  load packages
const multer = require('multer')
const moment = require('moment')
const path = require('path')
//  import model
const { Post } = require('../models /Post')
const User = require('../models /User')
const { Comment } = require('../models /Comment')
//  API's
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/postImages')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
var upload = multer({
  storage: storage
}).single('path')
//Create New Post - PArt1
exports.post_create_get = (req, res) => {
  res.render('post/create')
}
//Create New Post - Part2
exports.post_create_post = (req, res) => {
  let post = new Post(req.body)
  if (typeof req.file !== 'undefined') {
    post.path = 'postImages/' + req.file.filename
  }

  post
    .save()
    .then(() => {
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
    .populate('user comment')
    .populate({
      path: 'comment', // populate Comment
      populate: {
        path: 'user' // in comment, populate user
      }
    })
    .then((posts) => {
      res.render('post/index', { posts })
    })
    .catch((err) => {
      console.log('couldnt find posts' + err)
    })
}

//  view my post
exports.post_detail_get = (req, res) => {
  Post.findById(req.query.id)
    .populate('likes')
    .populate({
      path: 'comment', // populate Comment
      populate: {
        path: 'user' // in comment, populate user
      }
    })
    .then((post) => {
      res.render('post/detail', { post, moment })
    })
    .catch((err) => {
      console.log(err)
    })
}

//  edit post
exports.post_edit_get = (req, res) => {
  Post.findById(req.query.id)
    .then((post) => {
      if (post.user == res.locals.currentUser.id) {
        res.render('post/edit', { post })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.post_updete_post = (req, res) => {
  console.log(req.query.id)
  let post = req.body
  if (typeof req.file !== 'undefined') {
    post.path = 'postImages/' + req.file.filename
  }
  Post.findByIdAndUpdate(req.query.id, req.body)
    .then(() => {
      res.redirect('/user/profile')
    })
    .catch((err) => {
      console.log(err)
    })
}

//  delete post
exports.post_delete_get = (req, res) => {
  Post.findById(req.query.id)
    .then((post) => {
      if (post.user == res.locals.currentUser.id) {
        Post.deleteOne(post)
          .then()
          .catch((err) => {
            console.log('cuoldnt delete error: ' + err)
          })
      }
      res.redirect('back')
    })
    .catch((err) => {
      console.log(err)
    })
}
//  like post
exports.post_like_post = async (req, res) => {
  Post.findById(req.query.id)
    .then((post) => {
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
    })
    .catch((err) => {
      console.log(err)
    })
}

//  comment post
exports.comment_add_post = (req, res) => {
  Post.findById(req.query.id)
    .then((post) => {
      let comment = new Comment(req.body)
      comment
        .save()
        .then(() => {
          post
            .updateOne({
              $push: { comment: comment }
            })
            .then(() => {
              res.redirect('back')
            })
            .catch((err) => {
              console.log('err')
            })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
//Will View The Profile of who posted the post
exports.view_user_get = (req, res) => {
  // User.findById(req.query.id)
  //   .then((user) => {
  //     res.render('user/detail', { user, layout: 'user/detail' })
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

  Post.find({ user: req.query.id })
    .then((posts) => {
      User.findById(req.query.id)
        .then((user) => {
          res.render('user/detail', { posts, user })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
