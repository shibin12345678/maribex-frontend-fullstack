import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import "./Users.css";
import dot from '../Assets/dot.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Users() {
  const [userProfile, setUserProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); 
  const [userPosts, setUserPosts] = useState([]);
  const [followersCount ,setFollowersCount] = useState([])
  const [followingCount ,setFollowingCount] = useState([])
  const [followbtn, setFollowBtn] = useState(false)
  const { id } = useParams(); // Get the userId from URL params

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:9001/api/getUser/${id}`);
      setUserProfile(response.data.user);
      setIsFollowing(response.data.user?.isFollowing || false);
      setFollowersCount(response.data.user.followers)
      setFollowingCount(response.data.user.following)
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:9001/api/post/${id}`);
      setUserPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  useEffect(() => {
  fetchUserProfile();
  fetchUserPosts();
  }, [id, followersCount]);

  const handleFollow = async () => {
    setFollowBtn(!followbtn)
    try {
      if (isFollowing) {
        // If already following, unfollow
        const response = await axios.post(`http://localhost:9001/api/unfollow/${id}`, {
          userUnfollowId: userProfile._id // Assuming userProfile has the user id
        });
        console.log(response.data.message); // Log success message
        setIsFollowing(false);
      } else {
        // If not following, follow
        const response = await axios.post(`http://localhost:9001/api/follow/${id}`, {
          userFollowId: userProfile._id // Assuming userProfile has the user id
        });
        // console.log(response.data)
        console.log(response.data.message); // Log success message
        setIsFollowing(true);
        // setFollowersCount(response.data.user.followers)
      }
      fetchUserProfile();
    } catch (error) {
      console.error('Error:', error.response.data); // Log detailed error message
      // Handle error
    }
  };
  
  return (
    <>
      <div>
        <Sidebar/>
      </div>
      <div>
        <div className="profail-main-container">
          <div className="dp-image-conainer">
            <img
              src={userProfile ? userProfile?.profilePic : ''}
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
                  <button className="follow" onClick={handleFollow}>
                    {followbtn === false ? "Unfollow" : "Follow"}
                  </button>
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
        <button className="item">{userPosts.length} <span>posts</span></button>
          <button  className="item">{userProfile ? userProfile.followersCount : 'Loading...' }  <span>{followersCount.length } followers</span></button>
          <button  className="item">{userProfile ? userProfile.followingCount : 'Loading...' } <span>{followingCount.length } following</span></button>      
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
          {userPosts.map(post => (
            <div key={post._id} className="post-item">
              <img src={post.image} alt="Post" className="imagez" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
