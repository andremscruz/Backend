require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Tenzie = require(`./models/tenzies`)

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//FECTH HOME PAGE
app.get('/', (request, response) => {
    response.send(`<h1>Hello World!</h1>`)
})

//TENZIES GAME
//FETCH ALL RESOURCES
app.get('/api/tenzies', (request, response) => {
  Tenzie.find({}).then(tenzies => response.json(tenzies))
})

app.post('/api/tenzies', (request, response) => {
  const body = request.body

  const tenzie = new Tenzie({
    name: body.name,
    score: body.score,
    chronometer: body.chronometer
  })

  tenzie
    .save()
    .then((savedTenzie) => {
      response.json(savedTenzie)
    })
    .catch((error) => {
      console.log(error)
      response.status(500).send(`Internal server error`)
    })
    
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})