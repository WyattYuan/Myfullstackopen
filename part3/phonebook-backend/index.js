require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

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
    Person.find({}).then(persons =>
        res.json(persons)
    )
})


app.get('/api/info', (req, res) => {
    const requestTime = new Date()
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>                                                                        
          <p>${requestTime}</p>`
    )
})


app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(
        person => res.json(person)
    )
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json(
            { error: 'name or number missing' }
        )
    }
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json(
            { error: 'name must be unique' }
        )
    }

    const newPerson = {
        id: crypto.randomUUID(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    res.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`run the fuck server on ${PORT}`);

})