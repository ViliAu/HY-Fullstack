const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.replace('Bearer ', '')
      const decoded = jwt.decode(token, process.env.SECRET)
      const user = await User.findById(decoded.id);
      req.user = user;
    }
    next()
}