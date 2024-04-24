import React from 'react'
import "./Chat.css"

const Chat = () => {
  return (
    <div className='MainChatContainer'>
      <div>
          <div  style={{display:"flex", marginLeft:"28px",marginTop:"17px",backgroundColor:"rgb(241 243 241)",width:"650px",padding:"5px",borderRadius:"10px"}}>
         <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960" alt=""  className='userProfail'/>
         <p style={{backgroundColor:"rgb(241 243 241)",marginTop:"7px",marginLeft:"10px"}}>Sumana</p>
          </div>
            <div className='msgContainer'>
                  <div   style={{display:"flex",alignItems:"center",marginLeft:"30px",backgroundColor:"rgb(241 243 241)",marginTop:"10px",padding:"3px",borderRadius:"10px",width:"40%",marginTop:"13px"}}>
                      <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960" alt="" className='chatUserProfailc' />
                      <p style={{backgroundColor:" rgb(241 243 241)",textAlign:"start",marginLeft:"10px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi qui recusandae nemo vero reiciendis eos odit temporibus maxime id voluptates?</p>
                  </div>
                  <div  style={{display:"flex",alignItems:"center",marginLeft:"400px",backgroundColor:"rgb(241 243 241)",marginTop:"10px",padding:"3px",borderRadius:"10px",width:"40%",marginTop:"13px"}}>

                      <p style={{backgroundColor:" rgb(241 243 241)",textAlign:"start",marginLeft:"10px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi qui recusandae nemo vero reiciendis eos odit temporibus maxime id voluptates?</p>
                  </div>
                  <div  style={{display:"flex",alignItems:"center",marginLeft:"30px",backgroundColor:"rgb(241 243 241)",marginTop:"10px",padding:"3px",borderRadius:"10px",width:"40%",marginTop:"13px"}}>
                      <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960" alt="" className='chatUserProfailc' />
                      <p style={{backgroundColor:" rgb(241 243 241)",textAlign:"start",marginLeft:"10px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi qui recusandae nemo vero reiciendis eos odit temporibus maxime id voluptates?</p>
                  </div>
                  <div  style={{display:"flex",alignItems:"center",marginLeft:"400px",backgroundColor:"rgb(241 243 241)",marginTop:"10px",padding:"3px",borderRadius:"10px",width:"40%",marginTop:"13px"}}>
                      <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960" alt="" className='chatUserProfailc' />
                      <p style={{backgroundColor:" rgb(241 243 241)",textAlign:"start",marginLeft:"10px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi qui recusandae nemo vero reiciendis eos odit temporibus maxime id voluptates?</p>
                  </div>
            </div>
              <div className='sendMsgCon'>
                  <input type="text" placeholder='write your message..' className='msgInput' />
                  <button   className='msgBton'>send</button>
              </div>
      </div>
    </div>
  )
}

export default Chat
