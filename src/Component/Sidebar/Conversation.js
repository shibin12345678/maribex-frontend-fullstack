import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Conversation.css";
import { useParams } from 'react-router-dom';
import Chat from './Chat'
import io from 'socket.io-client';


const Conversation = () => {
    const userId=localStorage.getItem("userId")
    
    const [currentChatUser,setCurrectChatUser]=useState("")
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/api/followinglist/${userId}`); 
        setFollowingList(response.data.user.following);

      } catch (error) {
        console.error('Error fetching following list:', error);
      }
    };

    fetchFollowingList();
  }, []);
   const handleUser=(e)=>{

     setCurrectChatUser(e)
   }
  return (
    <div style={{display:"flex"}}>
      <div>
        <div style={{ width: "20pc", padding: "10px" }}>
          <input type="search" placeholder='Search your friends' className='searchBarForContact' />
        </div>
        <div className='userDetailContainer'>
          {followingList.map((user) => (
            <div className='userContainer' key={user._id} onClick={(e)=>handleUser(user)}>
              <img src={user.profilePic} alt={user.username} className='chatUserImg' />
              <div style={{ marginLeft: "10px" }} className='uuu'>
                <p style={{ textAlign: "start", marginTop: "10px", fontSize: "15px" }} className='ttt'>{user.username}</p>
                <p style={{ textAlign: "start", marginTop: "-18px", fontSize: "14px" }} className='ttt'>Open your message</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentChatUser !=="" ?
      <Chat currentChatUser={currentChatUser}/>:<div style={{marginLeft:"150px",marginTop:"200px"}}>
         <p style={{fontSize:"30px",textAlign:"center", color:'lightBlue'}}>Open Chat Message with friends</p>
      </div>
        }
    </div>
  );
};

export default Conversation;
