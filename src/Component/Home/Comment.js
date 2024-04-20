import React, { useEffect, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import "../Home/Post.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 500,
  bgcolor: 'background.paper',
  border: "none",
  boxShadow: 24,
  p: 4,
 // Add overflow scroll for y-axis
};

const Comment = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postData, setPostData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePostComment = async (postId, userId) => {
    try {
      const response = await fetch(`http://localhost:9001/api/post/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, text: commentText }),
      });
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
      fetchComments();
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchPostData();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:9001/api/post/getcomments/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data.postReply.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  const fetchPostData = async () => {
    try {
      const response = await axios.get(`http://localhost:9001/api/postId/${postId}`);
      setPostData(response.data.post);

    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };


  return (
    <>
    <div>
      <button className='button' onClick={handleOpen}>
        <FaRegComment />
      </button>
      <Modal className='modall'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <Box sx={style}>
          <img src={postData?.image} className='moadal-image' />
          <div className='right-section'>
            <div className='modal-usename'>
              <div className='modal-span'>
                <img src={postData?.postById?.profilePic} alt="" className="postProfile" />
                <span className='modal-user'>{postData?.postById?.username}</span>
              </div>
            </div>
            {/* Apply scrolling to this div */}
            <div className='scrollable-section'>
              {comments.map(comment => (
                <div className='allusername' key={comment._id}>
                  <div className='modal-span'>
                    <img src={comment?.userId?.profilePic} alt={comment?.userId?.userName} className="postProfile" />
                    <span className='modal-user'>{comment?.userId?.username}</span>
                    <span className='comm'>{comment.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='comment-sec'>
              <input type='text' placeholder='Add a comment..' className='modal-input'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)} />
              <button className='btn-modal' onClick={() => handlePostComment(postId, userId)}> post</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
    </>
  );
};

export default Comment;
