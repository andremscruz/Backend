const mongoose = require(`mongoose`)

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
