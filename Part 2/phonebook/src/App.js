import React, {useState, useEffect} from 'react';
import serverHelper from './services/serverHelper'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import People from './components/people'
import AddedNotification from './components/addedNotification'
import DeletedNotification from './components/deletedNotif'
import UpdatedNotification from'./components/updatedNotif'
import NotFound from './components/notFoundNotif'

const App = ()=> {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPeople, setFilterPeople] = useState(persons)
  const [notifName, setNotifName] = useState(null)
  const [deletedName, setDeletedName] = useState(null)
  const [updatedName, setUpdatedName] = useState(null)
  const [notFound, setNotFound] = useState(null)

  //get the data from the server
  const effectHook = () =>{
    const promise = serverHelper.getContacts()
    promise.then(contacts => {
      setPersons(contacts)
      setFilterPeople(contacts)
    })
  }
  //finish the effect hook
  useEffect(effectHook,[])

  const checkName=(event)=> setNewName(event.target.value)
  const checkNumber=(event) => setNewNumber(event.target.value)
  const filterChange =(event) =>{
    let filterValue = event.target.value.toLowerCase()
    //get latests value
    if(filterValue === ''){
      setFilterPeople(persons)
    }
    else{
      const filtered = persons.filter(Person => Person.name.toLowerCase().includes(filterValue))
      setFilterPeople(filtered)
      //console.log(filtered)
    }
  }
  
  //event to handle a new note
  const addNewName = (event) =>{
    event.preventDefault();  
    //check if it already exists
    let found = persons.find(person => person.name === newName)
    //the contact already exists
    if(found !== undefined && newNumber === found.number){
      const msg = newName + ' is already added to the phonebook';
      alert(msg);
    }

    //needs to update
    else if(found !== undefined && newNumber !== found.number){
      let message = found.name + " is already added to phonebook, replace old number with a new one?"
      let replace = window.confirm(message)
      //update this contact's number
      if(replace){
        const updatedPerson = {
          name: found.name,
          number: newNumber,
          id: found.id
        }
        const update = serverHelper.updateContact(found.id, updatedPerson)
        update.then(newNumber => {
           //update dislay
          const promise = serverHelper.getContacts()
          promise.then(contacts => {
            setPersons(contacts)
            setFilterPeople(contacts)
            setNewName('')
            setNewNumber('')
          })

          //show notification
          setUpdatedName(updatedPerson.name)
          setTimeout(() => {
            setUpdatedName(null)
          }, 3000)

        })
        .catch(error =>{
          //show not found notification
          setNotFound(updatedPerson.name)
          setTimeout(() => {
            setNotFound(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
      }
    }
    else{
      const Person = {
        name: newName,
        number: newNumber,
        id: persons[persons.length-1].id + 1
      }

      const addPromise = serverHelper.addContact(Person) 
      addPromise.then(newContact =>{
        persons.push(newContact)
        setPersons(persons)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log("failed to add new contact")
      })
      setNotifName(Person.name)
       //reset added Addednotification
      setTimeout(() => {
          setNotifName('')
        }, 3000)
    }
  }

  //delete contact call back
  const deletePerson = (personID,personName)=>{
    //console.log(personID)
    let message = "Delete " + personName + "?"
    let delConfirmed = window.confirm(message)
    if(delConfirmed){
      const deletePromise = serverHelper.deleteContact(personID)
      deletePromise.then(dummy => {
          //update dislay
          const promise = serverHelper.getContacts()
          promise.then(contacts => {
            setPersons(contacts)
            setFilterPeople(contacts)
            //show notification
            setDeletedName(personName)
            setTimeout(() => {
              setDeletedName(null)
            }, 3000)
          })
      })
      .catch(error =>{
        //show 404 notification
        setNotFound(personName)
        setTimeout(() => {
              setNotFound(null)
            }, 3000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook </h2>
      <AddedNotification name={notifName} />
      <UpdatedNotification name={updatedName} />
      <DeletedNotification name={deletedName} />
      <NotFound name={notFound} />
      <Filter filterChange={filterChange} />

      <h2>Add a new person</h2>
      <PersonForm newName ={newName} checkName={checkName} addNewName={addNewName} newNumber={newNumber} checkNumber={checkNumber} />

      <h2>Numbers </h2>
      <People people={filteredPeople} deleteCallBack={deletePerson} />
    </div>
  );
}

export default App;
