import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../services/anecdotes'
import { useMessageDispatch } from '../MessageContext'

const AnecdoteForm = () => {
  const dispatch = useMessageDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  // TODO instead of dispatching I should create better helper functions but tbh I can't be arsed
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 }, {
      onError: (e) => {
        dispatch({type: 'SET', payload: `anecdote ${content} too short.`})
        setTimeout(() => {
          dispatch({type: 'CLEAR'})
        }, 5000);
        return
      }
    })
    dispatch({type: 'SET', payload: `anecdote ${content} created.`})
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, 5000);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
