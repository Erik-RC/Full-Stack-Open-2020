import React from 'react'
import './notif.css'

const NotFound = ({name}) =>{
  if(name === null){
    return null;
  }
  return(
    <div className='NotFound'>
      Information for {name} has already been removed from the server.
    </div>
  )
}

export default NotFound