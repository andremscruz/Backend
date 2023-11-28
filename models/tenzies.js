const mongoose = require(`mongoose`)

mongoose.set(`strictQuery`, false)

const url = process.env.MONGODB_URI
//`mongodb+srv://andremscruz:andrita1713@cluster0.mpuvtjj.mongodb.net/Tenzies?retryWrites=true&w=majority`
console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const tenzieSchema = new mongoose.Schema({
    name: String,
    score: Number,
    chronometer: Number,
})

tenzieSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Score', tenzieSchema)
