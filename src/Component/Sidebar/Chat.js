import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./Chat.css";

import io from 'socket.io-client';


const Chat = ({ currentChatUser }) => {
    const userId=localStorage.getItem("userId")
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage,setInputMessage]=useState("")
    const [arraivalMessage,setArraivailMesage]=useState(null)
    const socket=useRef();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
              const user2Id=currentChatUser._id;
              console.log(user2Id,"secondUserId")
                const response = await axios.get(`http://localhost:9001/api/post/chat/msg/${userId}/${user2Id}`);
                setMessages(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchMessages();
    }, [userId, currentChatUser._id]);
    

 //socket
   useEffect(()=>{
       if(currentChatUser !==""){
           socket.current =io("http://localhost:9001")
           socket.current.emit("addUser",currentChatUser._id)
       }
   },[currentChatUser._id])

    console.log(socket)

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:9001/api/getUser/${userId}`);
              console.log(response,"userdeatils")
            setUser(response.data.user);
           
          } catch (error) {
            setError(error.message);
           
          }
        };
        fetchUserProfile();
       
      }, []);

      
    const handleClick = async () => {
        const message={
            myself:true,
            message:inputMessage
        }
        try {
           
            const user2Id = currentChatUser._id;
            socket.current.emit("send-msg", {
                to:user2Id,
                from:userId,
                message:inputMessage,

           })
            const response = await axios.post('http://localhost:9001/api/post/msg', {
                from: userId,
                to: user2Id,
                message: inputMessage
            });
            console.log("Message sent successfully:", response.data);
            // Update messages state with the newly sent message
            setMessages(messages.concat(message));
            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(()=>{
         if(socket.current){
              socket.current.on("msg-receive",(msg)=>{
                console.log(msg)
                 setArraivailMesage({myself:false,message:msg})
              })
         }
    },[arraivalMessage]);

    useEffect(()=>{
          arraivalMessage && setMessages((pre)=>[...pre,arraivalMessage])
    },[arraivalMessage])

    return (
        <div className='MainChatContainer'>
            <div>
                <div style={{ display: "flex", marginLeft: "28px", marginTop: "17px", backgroundColor: "rgb(241 243 241)", width: "650px", padding: "5px", borderRadius: "10px" }}>
                    <img src={currentChatUser.profilePic} alt="" className='userProfail' />
                    <p style={{ backgroundColor: "rgb(241 243 241)", marginTop: "7px", marginLeft: "10px" }}>{currentChatUser.username}</p>
                </div>
                <div className='msgContainer'>
                    {messages.map((msg, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginLeft: msg.myself ? "400px" : "30px", backgroundColor: "rgb(241 243 241)", marginTop: "10px", padding: "3px", borderRadius: "10px", width: "40%", marginTop: "13px" }}>
                            {msg.myself ? (
                                <>
                                    <p style={{ backgroundColor: "rgb(241 243 241)", textAlign: "start", marginLeft: "10px" }}>{msg.message}</p>
                                    <img src={user?.profilePic} alt="" className='chatUserProfailc' />
                                </>
                            ) : (
                                <>
                                    <img src={currentChatUser.profilePic} alt="" className='chatUserProfailc' />
                                    <p style={{ backgroundColor: "rgb(241 243 241)", textAlign: "start", marginLeft: "10px" }}>{msg.message}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className='sendMsgCon'>
                    <input type="text" placeholder='write your message..' className='msgInput' onChange={(e)=>setInputMessage(e.target.value)} />
                    <button onClick={handleClick} className='msgBton'>send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
