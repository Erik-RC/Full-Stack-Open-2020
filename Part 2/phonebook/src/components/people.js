import React from 'react'

const People =(props)=>{
  return(
    <ul>
        {props.people.map((person,i)=>
          <li key={i}><PersonInfo person={person} deleteCallBack={props.deleteCallBack} /> </li>
        )}
    </ul>
  )
}

const PersonInfo = (props) =>{
  const person = props.person
  const deleteCallBack= props.deleteCallBack
  return(
    <div>
      <div>
        {person.name} {person.number}
        <button onClick={() =>{deleteCallBack(person.id, person.name)}}> Delete </button>
      </div>
    </div>
  )
}

export default People