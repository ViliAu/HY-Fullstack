const mongoose = require('mongoose');
const config = require('../utils/config')

mongoose.connect(config.MONGODB_URI)

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true, minLength: 3},
  name: {type: String, required: true},
  password: {type: String, required: true},
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema);
