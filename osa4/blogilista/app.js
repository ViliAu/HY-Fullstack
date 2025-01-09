const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogRouter')
const usersRouter = require('./controllers/usersRouter')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

module.exports = app;