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
  const { id } = useParams(); // Get the userId from URL params

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/api/getUser/${id}`);
        setUserProfile(response.data.user);
       
        setIsFollowing(prevState => !prevState);
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
    fetchUserProfile();
    fetchUserPosts();
  }, [id]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        // If already following, unfollow
        const response = await axios.post(`http://localhost:9001/api/unfollow/${id}`, {
          userUnfollowId: userProfile._id // Assuming userProfile has the user id
        });
        console.log(response.data.message); // Log success message
      } else {
        // If not following, follow
        const response = await axios.post(`http://localhost:9001/api/follow/${id}`, {
          userFollowId: userProfile._id // Assuming userProfile has the user id
        });
        console.log(response.data.message); // Log success message
      }
      
      // Toggle follow status based on previous state
      setIsFollowing(prevState => !prevState);
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
                    {isFollowing ? "Following" : "Follow"} {/* Change button text based on follow status */}
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
          <button className="item">{userProfile ? userProfile.postCount : 'Loading...' } <span>post</span></button>
          <button  className="item">{userProfile ? userProfile.followersCount : 'Loading...' }  <span>{userProfile ? userProfile.followers.length : 'Loading...' } followers</span></button>
          <button  className="item">{userProfile ? userProfile.followingCount : 'Loading...' } <span>{userProfile ? userProfile.following.length : 'Loading...' } following</span></button>      
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
