import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios'; // Import Axios for making HTTP requests
import "./Search.css";
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const history = useHistory();
  const navigate=useNavigate();
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9001/api/users');
      setUsers(response.data.Users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserClick = (userId) => {
    navigate(`/Users/${userId}`);
  };

  const filteredUsers = users.filter(user => {
    return user.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className='main-box'> 
        <Sidebar />
        <div className='input-box'>
          <span className='input-box-name'>Search</span>
          <div>
            <input type="text" 
              placeholder='search'
              className='input-search'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            {filteredUsers.map(user => (
              <div key={user._id} className='conversation' style={{ cursor: 'pointer' }} onClick={() => handleUserClick(user._id)}>
                <img src={user.profilePic}  className='conversationImgg' />
                <span className="conversationName">{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
