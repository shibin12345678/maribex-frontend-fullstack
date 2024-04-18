import React from 'react'
import "./ChatOnline.css"

const ChatOnline = () => {
  return (
  <>
     <div className='chatOnline'>
          <div className='chatOnlineFriend'>
               <div className='chatOnlineImgContainer'>
                   <img className='chatOnlineImg' src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960" alt="" />
                   <div className='chatOnlineBadge'></div>
               </div>
                 <span className="chatOnlineName">Jone due</span>
          </div>
     </div>
  </>
  )
}

export default ChatOnline
