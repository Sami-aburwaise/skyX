//  load mongoose
const mongoose = require('mongoose')

//  create schema
const postSchema = mongoose.Schema(
  {
    type: String,
    path:String,
    description: String,
    likes: {
      type:Number,
      default: 0
    }, 

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
