const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log('connecting to', url)

mongoose.connect(url)
  .then(
    () => console.log('connected to MongoDB!!')
  )
  .catch(
    error => console.error('shit! fail to connect to MongoDB:', error.message)
  )

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: v => { return /^(?=.{8,}$)\d{2,3}-\d+$/.test(v) },
        message: 'Please provide a valid phone number in the format XXX-XXXXXX'

      }
    }
  }
)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)
