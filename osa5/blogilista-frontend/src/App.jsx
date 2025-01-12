import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import userService from './services/user'
import UserCard from './components/UserCard'
import BlogForm from './components/BlogForm'
import Hideable from './components/Hideable'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [messageData, setMessageData] = useState({ show: false, error: false, message: '' })

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [])

  const showMessage = async (error, message) => {
    setMessageData({ show: true, error, message })
    setTimeout(() => {
      setMessageData({ show: false, error, message })
    }, 2000)
  }

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    catch (e) {
      showMessage(true, 'Failed to fetch blogs')
    }
  }

  const likeBlog = async (id) => {
      try {
        await blogService.like(id)
        fetchBlogs()
      }
      catch(e) {
        console.log(e)
      }
  }

  const createBlog = async (newBlog) => {
      const result = await blogService.create(newBlog)
      console.log(result)

      showMessage(false, `a new blog ${result.title} added` )
      fetchBlogs()
    }

  return (<>
    <Message data={messageData} />
    <Hideable visible={!user}>
      <div>
        <LoginForm
          showMessage={showMessage}
          setUser={setUser} />
      </div>
    </Hideable>
    <Hideable visible={user}>
      <div>
        <h2>blogs</h2>
        <UserCard user={user} setUser={setUser} />
        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogForm
            blogHandler={createBlog}
            blogFormRef={blogFormRef}
            showMessage={showMessage} />
        </Togglable>

        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} user={user} blog={blog} fetchBlogs={fetchBlogs} handleLike={likeBlog} />
        )}
      </div>
    </Hideable>
  </>)
}

export default App