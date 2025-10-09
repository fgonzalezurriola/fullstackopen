import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotificationTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    console.log('FULL STATE:', state)
    console.log('ANECDOTES:', state.anecdotes)
    const filter = state.filter.toLowerCase()

    if (filter === '') {
      return state.anecdotes
    }

    return state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
  })

  const handleVote = (id) => {
    const votedAnecdote = anecdotes.find((a) => a.id === id)
    dispatch(vote(id))
    dispatch(setNotificationTimeout(`You voted: '${votedAnecdote.content}'`, 5))
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
