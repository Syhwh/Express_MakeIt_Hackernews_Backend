const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  article: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now()
  },
 

})
module.exports = mongoose.model('Post', PostSchema);