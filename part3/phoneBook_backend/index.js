const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/persons')
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(':method :url :status :response-time ms :body', {
    skip: (req) => req.method !== 'POST',
  })
)

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number is missing' })
  }

  const newPerson = new Person({ name, number })
  newPerson
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson)
    })
    .catch((error) => next(error))
})

// 3.15
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number is missing' })
  }

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date()
      const info = `<p>Phonebook has info for ${count} people</p><p>${date}</p>`
      response.send(info)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
