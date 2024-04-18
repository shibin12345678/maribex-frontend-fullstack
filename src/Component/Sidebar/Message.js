import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Message.css";
import axios from "axios";
import Conversation from "./Conversation";
import Chat from "./Chat";
import ChatOnline from "./ChatOnline";


const Message = () => {
     const [users, setUsers] = useState([]);
     const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user profile

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9001/api/users");
        setUsers(response.data.Users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:9001/api/getUser/${userId}`);
      setSelectedUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <>
      <div>
        <Sidebar />
      </div>
      
        <div className="messanger"> 
        <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input type="text" placeholder="Search for friend" className="chatMenuInput" />
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
            </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
                <Chat/>
                <Chat own={true}/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
                <Chat/>
            </div>
            <div className="chatBoxBottom">
               <input className="chatMessageInput" type="text" placeholder="write somthing..." />
               <button  className="chatSubmitButton">send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
               <ChatOnline/>
               <ChatOnline/>
               <ChatOnline/>
            </div>
        </div>
        </div>









    </>
  );
};

export default Message;
