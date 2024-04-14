import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import "./Users.css";
import dot from '../Assets/dot.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Users() {
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams(); // Get the userId from URL params

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/api/getUser/${id}`);
        setUserProfile(response.data.user);
        console.log(response, 'xcfvnm');
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, [id]);

  return (
    <>
      <div>
        <Sidebar/>
      </div>
      <div>
        <div className="profail-main-container">
          <div className="dp-image-conainer">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIzq6NgrpIR3NsdunE4LWENb4PIruU1QY_ZywaXhnMRKPg2wdTHaKdtW6XmlrA7L1h7mE&usqp=CAU/x"
              alt=""
              className="dp_image"
            />
          </div>
          <div className="dp-side-box">  
            <span className="idd-name"> </span>
            <div>
              {userProfile ? (
                <>
                  <span className='userName'>{userProfile.username}</span>
                  <button className="follow">Follow</button>
                  <button className="butns">Message</button>
                  <img src={dot} height="20px" style={{marginLeft:"7px"}} />     
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
        <div className="second-sec">
          <button className="item">{userProfile ? userProfile.postCount : 'Loading...' } <span>post</span></button>
          <button  className="item">{userProfile ? userProfile.followersCount : 'Loading...' }  <span>followers</span></button>
          <button  className="item">{userProfile ? userProfile.followingCount : 'Loading...' } <span>following</span></button>      
        </div>
        <div className="dicription">
          <p>{userProfile ? userProfile.name : 'Loading...'}</p>
        </div>
        <div className='bio'>
          <span>{userProfile ? userProfile.bio : 'Loading...'}</span>
        </div>
        <div className="statuss">
          {/* Render subStatuss */}
        </div>
        <div  className="footer">
          <button className="item-btn">POSTS</button>
          <button className="item-btn">SAVED</button>
          <button className="item-btn">TAGGED</button>
        </div>
        <div  className="3-section">
          {/* Render post, saved, and tagged sections */}
        </div>
      </div>
    </>
  );
}

export default Users;
