import React from 'react'
import "./Notification.css"
import Sidebar from './Sidebar'

const Notification = () => {
  return (
 <>
 
      <div>
         <Sidebar/>
      </div>

        <div className='Notification-sec'>
                   <span className='Notfication-Name'>Notifications</span>
        </div>
 
 </>
  )
}

export default Notification