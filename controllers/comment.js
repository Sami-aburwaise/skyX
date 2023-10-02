//  load packages
const moment = require('moment')

//  import model
const { Post } = require('../models /Post')
const { User } = require('../models /User')
const { Comment } = require('../models /Comment')

//  API's

//  edit comment
exports.comment_update_post = (req, res) => {
  Comment.findByIdAndUpdate(req.query.id, req.body)
    .then(() => {
      res.redirect('back')
    })
    .catch((err) => {
      console.log(err)
    })
}

//  delete comment
exports.comment_delete_get = (req, res) => {
  Comment.findById(req.query.id)
    .then((comment) => {
      if (comment.user == res.locals.currentUser.id) {
        Comment.deleteOne(comment)
          .then(() => {
            console.log('deleting comment')
          })
          .catch((err) => {
            console.log('couldnt delete error: ' + err)
          })
      }
      res.redirect('back')
    })
    .catch((err) => {
      console.log(err)
    })
}
