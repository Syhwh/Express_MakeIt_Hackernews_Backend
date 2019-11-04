const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postedBy: {
    type: String
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
  votes: {//set an array an show the length
    type: Array,
    default: []
  },
})
module.exports = mongoose.model('Post', PostSchema);