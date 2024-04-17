import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Message.css";
import axios from "axios";

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
      <div className="user">
        <div className="chat-sec">
          <span className="mess-ussername">
            <h1>Shibin_shan</h1>
          </span>
          {users.map((user) => (
            <div className="statussssss" key={user._id}>
              <img src={user.profilePic} className="subStatusss" />
              <div className="namesss">
                <span
                  className="ellipsisss"
                  onClick={() => handleClick(user._id)}
                >
                  {user.username}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="right-section-chat">
          <div className="username-box">
            <div className="subStatusss">
              <span className="chat-username">{selectedUser ? selectedUser.username : 'UserName'}</span>
            </div>
          </div>
          <div className="chat-sectoion-username">
            <div className="chat-inpu-sec">
              <input
                type="text"
                placeholder="Message..."
                className="chat-input"
              />
              <button className="chat-send">send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
