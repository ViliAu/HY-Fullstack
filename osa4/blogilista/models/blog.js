const mongoose = require('mongoose');
const config = require('../utils/config')

mongoose.connect(config.MONGODB_URI)

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: String,
  url: {type: String, required: true},
  likes: {type: Number, default: 0},
  user: {
    username: {type: String, required: true},
    name: {type: String, required: true},
    _id: {type: mongoose.Types.ObjectId, required: true},
  }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema);
