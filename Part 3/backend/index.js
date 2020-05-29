const express = require('express')
//const morgan = require('morgan') //import middleware API
const cors = require('cors')
const Person = require('./models/person') //import person model, has mongoose API

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

//using morgan middleware
//============================for dev...============================
// morgan.token('newPerson', (request) =>{
//   //console.log(request)
//   if(request.method !== 'POST'){
//     return "";
//   }
//   let newP = JSON.stringify(request.body)
//   return newP;
// })
// //app.use(morgan('tiny'))
// //use morgan to log function
// app.use(morgan(':method :url :status :res[content-length] :response-time :newPerson'))
//====================================================================

//NOTE: commented it out, was causing me some difficult errors
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

//=========== Middleware error handler ========================
const errorHandler = (error,request,response,next) =>{
  console.log('in error handler')
  console.log(error.message)
  if(error.name === 'CastError'){
    return response.status(404).send({error: 'malformed id'})
  }
  next(error)
}
app.use(errorHandler)
//===========================================================


//info page
app.get('/info',(request,response) =>{
  Person.find({}).then(people =>{
    const info = '<div>Phonebook has ' + people.length + ' people.</div>'
    const date = new Date()
    response.send(info + date)
  })
    .catch(error =>{
      console.log(error.message)
    })
})

//data page
app.get('/api/persons/:id',(request,response) =>{
  Person.findById(request.params.id).then(person =>{
    //we found the note
    if(person){
      response.json(person)
    }
    //the note id is not in the database
    else{
      response.status(404).end()
    }
  }) //error on our part
    .catch(error => {
      response.status(404).end()
    })
})

//get all people
app.get('/api/persons',(request,response) =>{
  Person.find({}).then(people =>{
    response.json(people)
  })
    .catch(error => {
      response.status(404).end()
    })

  //response.send(people) [before mongoose]
})

//delete request
app.delete('/api/persons/:id',(request,response) =>{
  Person.findByIdAndRemove(request.params.id)
    .then(result =>{
      response.status(204).end()
    })
    .catch(error =>{
      console.log(error.message)
      response.status(404).send({error: 'malformed id'})
    } )
})

//put/update request
app.put('/api/persons/:id',(request,response,next) =>{
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  //update person
  Person.findByIdAndUpdate(request.params.id,person,{new:true})
    .then(updatedPerson =>{
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//post request
app.post('/api/persons',(request,response) =>{
    
  const body = request.body
  //error handling
  // if(body.name === undefined || body.name === ""){
  //   return response.status(400).json({
  //     error: "Name missing"
  //   })
  // }

  // if(body.number === undefined || body.number === ""){
  //   return response.status(400).json({
  //     error: "Number missing"
  //   })
  // }

  //check if the name already exists
  //const existing = people.find(p => p.name === body.name)
  // let existing = undefined
  // Person.find({name:body.name}).then(person =>{
  //   existing = person
  // })

  //console.log(existing)
  // if(existing !== undefined){
  //   console.log('in error handler')
  //   return response.status(400).json({
  //     error: "Name already exists"
  //   })
  // }
  
  //things are okay
  //[before mongoose connection to DB]
  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id: Math.floor(Math.random()*1001 + 5) //num 5-1000
  // }
  //people = people.concat(person)
  //response.json(person)

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  //working with Mongoose validation instead
  //call save method and send back response
  person.save().then(savedPerson =>{
    response.send(person)
  })
    .catch(error => {
      //unique name error
      if(error.name === 'MongoError'){
        console.log(error.errmsg)
        let name = error.keyValue.name
        return response.status(422).json({
          error: name + ' already exists in database'
        })
      }
      else{ //must be minlength requirement error
        console.log(error.message)
        return response.status(400).json({
          error: error.message
        })
      }
    })
    
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
  console.log('listening on port ',PORT)
})