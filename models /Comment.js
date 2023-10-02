//  load mongoose
const mongoose = require('mongoose')
//  create schema
const commentSchema = mongoose.Schema(
  {
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

//  create and export model
const Comment = mongoose.model('Comment', commentSchema)
module.exports = { Comment }
