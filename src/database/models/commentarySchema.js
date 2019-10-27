const mongoose = require('mongoose');

const CommentarySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  }

})
module.exports = mongoose.model('Project', CommentarySchema);