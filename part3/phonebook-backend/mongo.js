const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('not valid argument')
    process.exit(1)
}

const password = process.argv[2]


// `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url = `mongodb+srv://evanescencefx_db_user:${password}U@cluster0.zabcasz.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    console.log('phonebook: ')
    Person.find({}).then(result => {
        result.forEach(note => {
            console.log(note.name,note.number)
        })
        mongoose.connection.close()
    })
}


