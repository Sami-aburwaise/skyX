//  load mongoose
const mongoose = require('mongoose')

//  create schema
const postSchema = mongoose.Schema(
  {
    type: String,
    path:String,
    description: String,
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }], 

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true
  }
)

//  create and export model
const Post = mongoose.model('Post', postSchema)
module.exports = { Post }
