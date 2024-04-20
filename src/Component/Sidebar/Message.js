import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Message.css";
import axios from "axios";
import Conversation from "./Conversation";
import Chat from "./Chat";
import ChatOnline from "./ChatOnline";

const Message = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to store the selected user profile
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null); // Changed from setCurrendChat to setCurrentChat
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:9001/api/getUser/${userId}`);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        if (user) {
          const res = await axios.get(`http://localhost:9001/api/conversation/${user._id}`);
          setConversation(res.data);
        }
      } catch (err) {
        console.log("Error fetching conversations:", err);
      }
    };
    getConversations();
  }, [user]);

  return (
    <>
      <div>
        <Sidebar />
      </div>
      
      <div className="messanger"> 
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Search for friend" className="chatMenuInput" />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
          
                <div className="chatBoxTop">
                  <Chat />
                  <Chat own={true} />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                </div>
                <div className="chatBoxBottom">
                  <input className="chatMessageInput" type="text" placeholder="write something..." />
                  <button className="chatSubmitButton">send</button>
                </div>
           
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
