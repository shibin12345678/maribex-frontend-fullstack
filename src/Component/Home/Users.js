import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import "./Users.css";
import dot from '../Assets/dot.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Users() {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [logUserId, setLogUserId] = useState(null); // Updated to null
  const [isFollowing, setIsFollowing] = useState({});

  const { id } = useParams(); // Get the userId from URL params

  useEffect(() => {
    const followStatus = localStorage.getItem(`follow_${id}`);
    const userId = localStorage.getItem('userId');
    setLogUserId(userId); // Set the logged-in user ID

    if (followStatus) {
      setIsFollowing(JSON.parse(followStatus));
    }
    
    fetchUserProfile();
    fetchUserPosts();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://api.maribex.site/api/getUser/${id}`);
      setUserProfile(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`https://api.maribex.site/api/post/${id}`);
      setUserPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const followingState = { ...isFollowing };

      if (followingState[userId]) {
        await axios.post(
          `https://api.maribex.site/api/unfollow/${logUserId}`,
          { userUnfollowId: userId }
        );
        followingState[userId] = false;
      } else {
        await axios.post(
          `https://api.maribex.site/api/follow/${logUserId}`,
          { userFollowId: userId }
        );
        followingState[userId] = true;
        console.log(followingState)
      }
      setIsFollowing(followingState);
      
      // Update local storage
      localStorage.setItem(`follow_${id}`, JSON.stringify(followingState));
    } catch (error) {
      console.error(error, "follow");
    }
  };
console.log(userProfile);
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
                  <button className="follow" onClick={() => handleFollow(userProfile._id)}>
                    {isFollowing[userProfile._id]
                      ? "Following"
                      : "Follow"}
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
          <button  className="item">{userProfile?.followers?.length} followers</button>
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
