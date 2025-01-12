const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
require('express-async-errors')

router.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    console.log(await Blog.find({}))
    res.status(204).send("Users and blogs deleted")
})

module.exports = router