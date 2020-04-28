import React from 'react'
const PersonForm = (props) =>{
  //call back functions and values
  const newName = props.newName
  const checkName = props.checkName
  const addNewName = props.addNewName
  const newNumber = props.newNumber
  const checkNumber = props.checkNumber

  return(
    <form>
        <div>name: <input value={newName} onChange={checkName}/></div>
        <div> number: <input value={newNumber} onChange={checkNumber}/> </div>
        <div>
          <button type="submit" onClick={addNewName}>
          Add
          </button>
        </div>
      </form>
  )
}

export default PersonForm