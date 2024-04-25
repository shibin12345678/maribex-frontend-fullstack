import React, { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";
import "./profail.css";
import { useNavigate } from "react-router-dom";
import ProfailImage from "./ProfailImage";


const Profail = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:9001/api/getUser/${userId}`);
         
        setUser(response.data.user);
        // console.log("dddd",response.data.user)
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserProfile();
   
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:9001/api/post/${userId}`);
            setPosts(response?.data?.posts);
        } catch (error) {
            console.error("Error fetching user posts:", error);
        }
    };
    fetchUserPosts();
}, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <>
        <div>
        <Sidebar />
        </div>

        <div className="profail-main-container">
        <div className=" dp-image-conainer">
        <img
            src={user?.profilePic}
            alt=""
            className="dp_image"
          />
        </div>
        <div className="dp-side-box">
          
            <span className="idd-name"> {user.username}</span>
          
          <div>
            <button className="butns" onClick={()=>navigate("/EditProfail")}>Edit Profail</button>
            <button className="butns">View archive</button>
            <button className="butns">Ad tools</button>
          </div>
          </div>
          </div>
          <div className="second-sec">
              <button className="item">{posts.length}  <span>post</span></button>
              <button  className="item">{user.followers.length}  <span>followers</span></button>
              <button  className="item">{user.following.length}   <span>following</span></button>      
          </div>
          
          <div className="dicription">
                      <p>{user?.bio}</p>
          </div>

          {/* <hr className="line" /> */}

   <div  className="footer">
  
      <div  >
           <button className="item-btn">POSTS</button>
      </div>
      <div>
           <button  className="item-btn">SAVED</button>
      </div>
      <div>
          <button  className="item-btn">TAGGED</button>
      </div>
     
   </div>


      <div  className="3-section">
    

        <ProfailImage  />


        
      <div className="saved"></div>
      <div className="taged"></div>

      </div>








    </>
  );
};

export default Profail;
