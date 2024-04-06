import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import "./Users.css"
import dot from '../Assets/dot.png'

function Users() {
  return (
    <>
    
       <div>
          <div>
          <Sidebar/>
          </div>
              <div>
              <div className="profail-main-container">
        <div className=" dp-image-conainer">
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIzq6NgrpIR3NsdunE4LWENb4PIruU1QY_ZywaXhnMRKPg2wdTHaKdtW6XmlrA7L1h7mE&usqp=CAU/x"
            alt=""
            className="dp_image"
          />
        </div>
        <div className="dp-side-box">
          
            <span className="idd-name"> </span>
             
          <div>
              <span className='userName'>shibin_shan</span>
            <button className="follow">Follow</button>
            <button className="butns">Message</button>
            <img src={dot} height="20px" style={{marginLeft:"7px"}} /> 
              
          </div>
          </div>
          </div>
          <div className="second-sec">
              <button className="item">0 <span>post</span></button>
              <button  className="item">  0  <span>followers</span></button>
              <button  className="item">0  <span>following</span></button>      
          </div>
          
          <div className="dicription">
                      <p>shibin shan</p>
          </div>
       <div className='bio'>
         <span > hey youu</span>
       </div>
          {/* <hr className="line" /> */}
           
   <div className="statuss">
                            <div className="subStatuss"></div>
                            <div className="name" >
                                <span className="ellipsiss"></span>
                            </div>
                            <div className="subStatuss"></div>
                            <div className="name" >
                                <span className="ellipsiss"></span>
                            </div>
   </div>
   
   <div  className="footerr">
  
      <div  >
           <button className="item-btn">POSTS</button>
      </div>
      <div>
           <button  className="item-btn">SAVED</button>
      </div>
      <div>
          <button  className="item-btn">TAGGED</button>
      </div>
     
   </div>


      <div  className="3-section">
    

    <div className="post">
         
    
            <div  className="post-item">
              <img src="" alt="Post" className="imagez" />
            </div>
         
    </div>
      <div className="saved"></div>
      <div className="taged"></div>

      </div>





              </div>
            
       </div>
    
    
    </>
  )
}

export default Users