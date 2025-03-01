module.exports = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      req.token = authorization.replace('Bearer ', '')
    }
    next()
}