import React from 'react'
import Sidebar from './Sidebar'
import Conversation from './Conversation'
// import Chat from './Chat'

const Message = () => {
  return (
   <>
   
    <Sidebar/>


 
      <div   style={{display:"flex" ,marginLeft:"260px"}} >
          <div>
          <Conversation/>
          </div>
         {/* <div><Chat/></div> */}
         


      </div>
   
   </>
  )
}

export default Message
