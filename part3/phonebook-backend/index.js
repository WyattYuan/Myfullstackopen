require('dotenv').config()
const express = require('express')
const app = express()
const PersonService = require('./models/person')
const morgan = require('morgan')
const util = require('util')

const inspectError = (error, context = 'Unhandled error') => {
  if (process.env.NODE_ENV === 'production') {
    console.error(`[${context}]`, error?.message || error)
    return
  }

  console.log('================ ERROR START ================')
  console.log('context:', context)
  console.log('type:', typeof error)
  console.log('instanceof Error:', error instanceof Error)
  console.log('constructor:', error?.constructor?.name)

  if (error && typeof error === 'object') {
    console.log('keys:', Object.keys(error))
    console.log('ownProps:', Object.getOwnPropertyNames(error))
  }

  console.log('name:', error?.name)
  console.log('message:', error?.message)
  console.log('stack:', error?.stack)
  console.log('full:', util.inspect(error, { depth: null, showHidden: true }))
  console.log('================= ERROR END =================')
}

morgan.token('content', function (req) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.content(req, res)
  ].join(' ')
}))

app.get('/', (request, response) => {
  response.send('<h1>Hello Phonebook!</h1>')
})

app.get('/api/persons', (req, res) => {
  PersonService.find({}).then(persons =>
    res.json(persons)
  )
})


app.get('/api/info', (req, res, next) => {
  PersonService.find({})
    .then(persons => {
      const requestTime = new Date()
      res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
                <p>${requestTime}</p>`
      )
    }
    ).catch(error => next(error))

})


app.get('/api/persons/:id', (req, res) => {
  PersonService.findById(req.params.id).then(
    person => res.json(person)
  )
})

app.delete('/api/persons/:id', (req, res, next) => {
  PersonService.findByIdAndDelete(req.params.id)
    .then(() => { res.status(204).end() }
    )
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  PersonService.create({
    name: body.name,
    number: body.number
  }).then(
    createdPerson => res.json(createdPerson)
  ).catch(
    error => {
      inspectError(error, 'POST /api/persons create failed')
      next(error)
    }
  )
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  // PersonService.findById(req.params.id).then(
  //     person => {
  //         if (!person) {
  //             return res.status(404).end()
  //         }

  //         person.name = name
  //         person.number = number

  //         return person.save().then(
  //             updatedPerson => { res.json(updatedPerson) }
  //         )
  //     }
  // ).catch(
  //     error => next(error)
  // )
  PersonService.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`run the fuck server on ${PORT}`)

})

const errorHandler = (error, request, response, next) => {
  inspectError(error, `${request.method} ${request.path}`)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)