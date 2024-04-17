import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./profail.css";
import { Box } from '@mui/material';
import { Modal } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height:500,
    bgcolor: 'background.paper',
    border: "none",
    boxShadow: 24,
    p: 4,
  };

const ProfailImage = ({ postId, userId }) => {
    const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [open, setOpen] = React.useState(false);

const [postData, setPostData] = useState(null);

const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(postId)
      
    useEffect(() => {
      
     
  
      const fetchPostData = async () => {
        try {
          const response = await axios.get(`http://localhost:9001/api/postId/${postId}`);
          console.log( response,"shsssjsjjsjsjjsjsj")
          setPostData(response.data.post);
    
        } catch (error) {
          console.error('Error fetching post data:', error);
        }
      };
      fetchPostData();
    }, []);



useEffect(() => {
    const fetchUserPosts = async () => {
        try {
          const userId = localStorage.getItem('userId');
          const response = await axios.get(`http://localhost:9001/api/post/${userId}`); // Assuming your backend endpoint for getting user posts is '/api/getUserPost/:id'
          setPosts(response?.data?.posts);
          
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      };
      fetchUserPosts();  
}, []);



  return (
   <>
   
   
   <div className="post">
         
         {posts.map(post => (
           <div key={post._id} className="post-item">
             <img src={post.image} alt="Post" className="imagez"  onClick={handleOpen}   />
           </div>
         ))}
   </div>

   <div>

   <Modal className='modall'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <Box sx={style}>
          <img src={postData?.image} className='moadal-image' />
         
        </Box>
      </Modal>

   </div>
   
   
   
   </>
  )
}

export default ProfailImage
