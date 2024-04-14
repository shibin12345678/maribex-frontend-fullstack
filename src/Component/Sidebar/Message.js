import React from 'react'
import Sidebar from './Sidebar'
import "./Message.css"

const Message = () => {
  return (
    <>
          <div>
               <Sidebar/>
          </div>
          <div>
                  <div className='username-sec'>

                <span className='mess-ussername'>   Shibin_shan</span>

                  </div>
                   <div className='chat-sec'>
                       

                   <div className="statusss">
                            <div className="subStatusss"></div>
                            <div className="namesss">
                                <span className="ellipsisss">Kishore</span>
                            </div>
                        </div>


                   </div>
          </div>
    
    </>
  )
}

export default Message