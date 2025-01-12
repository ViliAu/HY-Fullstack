import { useState, useEffect } from 'react'
import blogService  from '../services/blogs'

const BlogForm = ({ blogHandler, showMessage, blogFormRef }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const changeTitle = (val) => {
    setNewBlog({ ...newBlog, title: val })
  }
  const changeAuthor = (val) => {
    setNewBlog({ ...newBlog, author: val })
  }
  const changeUrl = (val) => {
    setNewBlog({ ...newBlog, url: val })
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      await blogHandler(newBlog);
      setNewBlog({ title: '', author: '', url: '' })
      blogFormRef.current.toggleVisibility()
    }
    catch (e) {
      showMessage(true, 'Failed to create blog')
      console.log(e)
    }
  }

  return (
    <form onSubmit={createBlog}>
      <div>Title: <input value={newBlog.title} onChange={({ target }) => changeTitle(target.value)} className='titleInput' /></div>
      <div>Author: <input value={newBlog.author} onChange={({ target }) => changeAuthor(target.value)} className='authorInput' /></div>
      <div>Url: <input value={newBlog.url} onChange={({ target }) => changeUrl(target.value)} className='urlInput' /></div>
      <div><button type="submit" className='submitButton'>create</button></div>
    </form>
  )
}

export default BlogForm