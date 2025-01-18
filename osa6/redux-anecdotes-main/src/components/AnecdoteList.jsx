import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = (id) => {
        const anec = anecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(id, anec.votes + 1))
        dispatch(showMessage(`you voted '${anec.content}'`, 2000))
    }

    return (<>
        {anecdotes.filter(a => a.content.toLowerCase()
                                .includes(filter.toLowerCase()))
                                .sort((a, b) => b.votes - a.votes)
                                .map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
    </>)
}

export default AnecdoteList