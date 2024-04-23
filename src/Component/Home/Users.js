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
  const [followersCount, setFollowersCount] = useState([]);
  const [followingCount, setFollowingCount] = useState([0]);
  const [followBtn, setFollowBtn] = useState(false);
  const { id } = useParams(); // Get the userId from URL params

  useEffect(() => {
    // Retrieve follow status from local storage
    const followStatus = localStorage.getItem(`follow_${id}`);
    const userId = localStorage.getItem('userId')
    if (followStatus) {
      setIsFollowing(JSON.parse(followStatus));
    }
    
    fetchUserProfile();
    fetchUserPosts();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:9001/api/getUser/${id}`);
      setUserProfile(response.data.user);
      setFollowersCount(response.data.user.followers);
      setFollowingCount(response.data.user.following);
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

 const handleFollow = async () => {
  setFollowBtn(!isFollowing); // Toggle follow status
  localStorage.setItem(`follow_${id}`, JSON.stringify(!isFollowing)); // Update local storage
  try {
    if (isFollowing) {
      // If already following, unfollow
      const response = await axios.post(`http://localhost:9001/api/unfollow/${id}`, {
        userUnfollowId: userProfile._id // Assuming userProfile has the user id
      });
      console.log(response.data.message); // Log success message
      setIsFollowing(false); // Update follow status
      setFollowingCount(prevCount => prevCount - 1); // Decrement following count
    } else {
      // If not following, follow
      const response = await axios.post(`http://localhost:9001/api/follow/${id}`, {
        userFollowId: userProfile._id // Assuming userProfile has the user id
      });
      console.log(response.data.message); // Log success message
      setIsFollowing(true); // Update follow status
      setFollowingCount(prevCount => prevCount + 1); // Increment following count
    }
    fetchUserProfile(); // Fetch updated user profile
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
                    {isFollowing ? "Unfollow" : "Follow"}
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
          <button  className="item">{followersCount.length } followers</button>
          <button  className="item">0 following</button>      
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
