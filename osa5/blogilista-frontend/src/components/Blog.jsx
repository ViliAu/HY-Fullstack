import { useState } from 'react'
import blogService from '../services/blogs'
import Hideable from './Hideable'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, handleLike, fetchBlogs }) => {

  const [moreData, setMoreData] = useState(false)

  const toggleVisibility = () => {
    setMoreData(!moreData)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Id comparison would be better for the button
  const deleteBlog = async () => {
    try {
      await blogService.deleteBlog(blog.id)
      fetchBlogs()
    }
    catch(e) {
      console.log(e)
    }
  }

  return <div style={blogStyle} className='blog'>
    {blog.title} {blog.author}<button onClick={toggleVisibility} className='showButton'>{moreData ? 'hide' : 'show'}</button>
    <Hideable visible={moreData} >
      <div>likes: {blog.likes} <button onClick={() => handleLike(blog.id)} className='likeButton'>like</button></div>
      <div>{blog.url}</div>
      <div>{blog.user.name}</div>
      {user && blog.user && blog.user.username === user.username ? <button onClick={deleteBlog}>delete</button> : null}
    </Hideable>
  </div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog