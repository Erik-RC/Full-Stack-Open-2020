const mongoose = require('mongoose')

//check command line arguments
if(process.argv.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1);
}

//connect to the database
const password = process.argv[2]
const dbURL = 'mongodb+srv://Fullstack2020:'+password+'@cluster0-q0njx.mongodb.net/phonebook?retryWrites=true&w=majority'
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology:true})

//schema for mongoose
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//person object
const Person = mongoose.model('Person',personSchema)

//only password given, display all
if(process.argv.length == 3){
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}

//get the rest of the arguments
else{
  const nombre = process.argv[3]
  const numero = process.argv[4]

  const person = new Person({
    name: nombre,
    number: numero,
  })

  person.save().then(result =>{
    console.log('added ' + nombre +', '+numero+' to phonebook')
    mongoose.connection.close()
  }).catch(error =>{
    console.log('error adding new person to phonebook')
    console.log(error)
    mongoose.connection.close()
  })
}



