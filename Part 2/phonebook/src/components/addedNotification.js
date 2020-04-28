import React from 'react'
import './notif.css'

const AddedNotification = ({name}) =>{
  if(name === null || name===''){
    return null;
  }
  return(
    <div className='Added'>
      {name} was added to phonebook!
    </div>
  )
}

export default AddedNotification