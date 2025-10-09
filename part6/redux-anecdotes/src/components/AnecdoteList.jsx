import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotificationTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase()
    console.log('filter', filter)

    if (filter === '') {
      return state.anecdotes
    }

    return state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
  })

  const handleVote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
    const votedAnecdote = anecdotes.find((a) => a.id === id)
    dispatch(setNotificationTimeout(`You voted: '${votedAnecdote.content}'`))
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
