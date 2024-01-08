const tenziesRouter = require('express').Router()
const Tenzie = require("../models/tenzies")

//FETCH ALL RESOURCES
tenziesRouter.get('/', (request, response) => {
    Tenzie.find({}).then(tenzies => response.json(tenzies))
  })

//CREATE NEW RESOURCE
tenziesRouter.post('/', (request, response) => {
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

  module.exports = tenziesRouter