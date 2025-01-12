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
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testRouter')
    app.use('/api/test', testingRouter)
}

app.use(errorHandler)

module.exports = app;