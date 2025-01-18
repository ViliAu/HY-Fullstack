import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createAnecdote = async (anecdote) => {
    if (anecdote.content.length < 5) {
        throw new Error("Invalid content")
    }
    const res = await axios.post(baseUrl, anecdote)
    return res.data
}

export const updateVotes = async (anecdote) => {
    const res = await axios.patch(`${baseUrl}/${anecdote.id}`, {votes: anecdote.votes + 1})
    return res.data
}