const mongoose = require('mongoose');
const config = require('../utils/config')

mongoose.connect(config.MONGODB_URI)

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: String,
  url: {type: String, required: true},
  likes: {type: Number, required: true, default: 0},
  user: {
    username: {type: String, required: true, default: 'Unknown'},
    name: {type: String, required: true, default: 'Unknown'},
    _id: {type: mongoose.Types.ObjectId, required: true, default: 'Unknown'},
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
