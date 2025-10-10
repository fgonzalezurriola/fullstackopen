import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AnecdoteList from './Components/AnecdoteList'
import About from './Components/About'
import Footer from './Components/Footer'
import CreateNew from './Components/CreateNew'
import Anecdote from './Components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const padding = {
    padding: 5,
  }

  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">
          anecdotes
        </Link>
        <Link style={padding} to="/createNew">
          create new
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
      </div>
      {notification && <div style={notificationStyle}>{notification}</div>}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/createNew" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
