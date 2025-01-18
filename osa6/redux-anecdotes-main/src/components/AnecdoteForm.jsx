import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        
        const content = event.target.anecdoteInput.value;
        dispatch(createAnecdote(content))
        dispatch(showMessage(`anecdote ${content} created`, 2000))
        event.target.anecdoteInput.value = ''
    }

    return (<>
        <h2>create new</h2>
        <form onSubmit={newAnecdote}>
            <div><input name='anecdoteInput' /></div>
            <button>create</button>
        </form>
    </>
    )
}

export default AnecdoteForm