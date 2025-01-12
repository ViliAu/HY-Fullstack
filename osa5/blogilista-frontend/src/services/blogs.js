import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const resp = await axios.post(baseUrl, newObject, config)
  return resp.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const resp = await axios.delete(`${baseUrl}/${id}`, config)
  return resp.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const resp = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return resp.data
}

const like = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  const blog = res.data
  const newBlog = { likes: blog.likes ? blog.likes + 1 : 1 }
  const updatedResp = await update(id, newBlog)
  return updatedResp
}

export default { getAll, create, update, setToken, like, deleteBlog }
