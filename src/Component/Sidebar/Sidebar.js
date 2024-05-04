
import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import   "../Sidebar/Sidebar.css"
import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { TbMessageDots } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { CgDetailsMore } from "react-icons/cg";
import instalogo from "../Pics/Instagram_logo.svg.png"
import { FaInstagram } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';





   const Sidebar = () => {
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
        setUser(response?.data?.user);
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const logoutUser = async () => {
    try {
      // Clear the JWT cookie
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Redirect to the login page
      navigate('/login');
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error in logout: ", error);
    }
  };


  return (
    <>
 
        <aside class="sidebar">
        <header class="sidebar-header">
        <img  src={instalogo} class="logo-img"/>
        <i class="logo-icon ">
        < FaInstagram/>
        </i>
        </header>
        <nav>
        <button onClick={()=>navigate("/")}>
        <span>
         <i ><MdHomeFilled/></i>
          <span>Home</span>
          </span>
          </button>
          <button onClick={()=>navigate("/Search")}>
          <span>
          <i  ><IoSearch/></i>
          <span onClick={()=>navigate("/Search")}>Search</span>
          </span>
          </button>
          <button onClick={()=>navigate("/Reels")}>
          <span>


          <i className='icon'><BiMoviePlay/></i>
          <span >Reels</span>
          </span>
          </button>

        <button  onClick={()=>navigate("/Message")}>
          <span>
            <i >
           < TbMessageDots/>
            </i>
            <span>Messages</span>
          </span>
        </button>

        {/* <button onClick={()=>navigate("/Notification")}>
          <span>
            <i >
           <FaRegHeart/>
            </i>
            <span>Notifications</span>
          </span>
        </button> */}



<Dropdown>
      <Dropdown.Toggle variant="none" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
        <span>
          <i><CgDetailsMore /></i>
          <span>Create</span>
        </span>
      </Dropdown.Toggle>
     
      <Dropdown.Menu className="no-arrow-dropdown">
        <Dropdown.Item onClick={() => navigate("/createPost")}  >Post</Dropdown.Item>
        <Dropdown.Item >Reels</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>






        <button  onClick={()=>navigate("/profail")} >
          <span>
          {user && user?.profilePic && (
                <img src={user?.profilePic} alt="Profile" style={{ borderRadius: "10px" }} />
              )}
            <span >Profile</span>
          </span>
        </button>

       

<div>
      <Dropdown>
       
        <Dropdown.Toggle variant="none">
          <span>
            <i><CgDetailsMore /></i>
            <span>More</span>
          </span>
        </Dropdown.Toggle>
       
        <Dropdown.Menu>
          <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>


        
      </nav>
    </aside>
    
    
    </>
  )
}

export default Sidebar
