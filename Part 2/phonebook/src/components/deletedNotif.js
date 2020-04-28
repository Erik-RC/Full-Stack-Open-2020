import React from 'react'
import './notif.css'

const DeletedNotification = ({name}) =>{
  if(name === null || name ===''){
    return null;
  }
  return(
    <div className='Deleted'>
      {name} was successfully deleted from the phonebook.
    </div>
  )
}

export default DeletedNotification