import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  if (!content) {
    throw new Error("empty content")
  }
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async (id, votes) => {
  console.log(id, votes)
  if (!id || !votes) {
    throw new Error("Invalid call")
  }
  const response = await axios.patch(baseUrl + '/' + id, {votes: votes})
  console.log(response.data)
  return response.data
}

export default {
  getAll,
  createNew,
  updateVotes
}