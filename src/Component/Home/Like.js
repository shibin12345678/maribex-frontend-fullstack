import React, { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import axios from 'axios';

const Like = ({ postId, userId }) => {
  const [post, setPost] = useState({});
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/api/post/${postId}`);
        console.log('Response:', response);
        if (response.status === 200 && response.data.post) {
          const { post } = response.data;
          setPost(post);
          setLiked(post.likes.includes(userId));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking like status:', error);
        setLoading(false);
      }
    };
    

    checkLikedStatus();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      if (!loading) {
        if (liked) {
          const response = await axios.post(`http://localhost:9001/api/post/unlike/${postId}`, { userId });
          if (response.status === 200) {
            setLiked(false);
            setPost(prevPost => {
              const updatedLikes = Array.isArray(prevPost.likes) ? prevPost.likes.filter(like => like !== userId) : [];
              return { ...prevPost, likes: updatedLikes };
            });
          } else {
            console.log('Error unliking');
          }
        } else {
          await axios.post(`http://localhost:9001/api/post/like/${postId}`, { userId });
          setLiked(true);
          setPost(prevPost => {
            const updatedLikes = Array.isArray(prevPost.likes) ? [...prevPost.likes, userId] : [userId];
            return { ...prevPost, likes: updatedLikes };
          });
        }
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <div>
      <button className='button' onClick={handleLike}>
        <FaRegHeart color={liked ? 'red' : 'black'} />
      </button>
      {/* <span className="likeCount">
        {post.likes && post.likes.length} likes
      </span> */}
    </div>
  );
};

export default Like;
