import React from 'react'
import "./Chat.css"

function Chat({own}) {
  return (
    <div className={own ? "message own":"message"}>
        <div className="messageTop">
            <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960"
             alt=""  className='messageImg'/>
             <p className='messageText'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
        </div>
        <div className="messageBottom">1 hour go</div>
    </div>
  )
}

export default Chat
