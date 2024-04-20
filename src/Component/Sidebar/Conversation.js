import React, { useEffect, useState } from 'react';
import "./Conversation.css";
import axios from 'axios';

function Conversation() {
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log("User ID:", userId); // Log the user ID
       
        const response = await axios.get(`http://localhost:9001/api/followinglist/${userId}`);
        console.log("Response from server:", response.data); // Log the response from the server
        setFollowingList(response.data.user.following);
      } catch (error) {
        console.error('Error fetching following list:', error);
      }
    };
    fetchFollowingList();
  }, []);

  return (
    <>
      {followingList.map((user) => (
        <div key={user._id} className='conversation'>
          <img src={user.profilePic} alt="" className='conversationImg' />
          <span className="conversationName">{user.username}</span>
        </div>
      ))}
    </>
  );
}

export default Conversation;
