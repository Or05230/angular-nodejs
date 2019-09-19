const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  stockq: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);
// Post.X
