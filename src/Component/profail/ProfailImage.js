import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./profail.css";
import { Box, Button } from '@mui/material'; // Import Button from MUI
import { Modal } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:300,
    height: 500,
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
    const [image, setImage] = useState(null); // Update to null initially
    const [postData, setPostData] = useState("");

    const handleOpen = (imageSrc) => {
        setImage(imageSrc); // Set the clicked image to the state
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://api.maribex.site/api/${userId}`);
               
                setPosts(response?.data?.posts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };
        fetchUserPosts();
    }, []);




  
    const handleDelete = async (postId) => {
      try {
          const response = await axios.delete(`https://api.maribex.site/api/post/${postId}`);
          console.log(response.data.message ,"delted"); // Log the response message from the server
          // Optionally, you can update the state to remove the deleted post from the UI
      } catch (error) {
          console.error("Error deleting post:", error);
      }
  }
    return (
        <>
            <div className="post">
                {posts.map(post => (
                    <div key={post._id} className="post-item">
                        <img
                            src={post.image}
                            alt="Post"
                            className="imagez"
                            onClick={() => handleOpen(post.image)}/>
                          < button className='prof-botton'  style={{color:"black"}} onClick={() => handleDelete(post._id)}>Delete</button>
                    </div>
                ))}
            </div>

            <div>
                <Modal
                    className='modall'
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {image && <img src={image} alt='post_img' className='moadal-image' />}
                    
                      
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default ProfailImage;
