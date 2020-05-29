//require('dotenv').config()

const mongoose = require('mongoose')
mongoose.set('useFindAndModify',false)
mongoose.set('useCreateIndex',true) //gets rid of the "DeprecatedWarning" when using mongoose-unique-validator

const URI = process.env.MONGODB_URI

//for dev purposes
console.log('connecting to: ', URI)

//connect to the database
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(result =>{
    console.log('connected to MongoDB')
  })
  .catch(error =>{
    console.log('error connecting to MongoDB: ', error.message)
  })

//schema for person object, mongoose needed
const personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number:{
    type: String,
    required: true,
    minlength: 8
  } 
})

//set toJSON method to convert mongo id to string for a new person
personSchema.set('toJSON',{
  transform: (document,returnedObject) =>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person',personSchema)
