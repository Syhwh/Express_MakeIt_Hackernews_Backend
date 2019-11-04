const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String,
    require: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }

})
module.exports = mongoose.model('Comment', CommentSchema);