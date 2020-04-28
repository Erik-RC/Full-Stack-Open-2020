import React from 'react'
import './notif.css'

const UpdatedNotification = ({name}) =>{
  if(name === null || name ===''){
    return null;
  }
  return(
      <div className='Updated'>
        Information for {name} was updated.
      </div>
    )
}
export default UpdatedNotification