import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const Like = ({ postId, userId }) => {
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/api/postId/${postId}`);
         console.log("response",response)
        if (response.data && response.data.post) {
          const { post } = response.data;
          setPost(post);
          setLiked(post.likes.includes(userId));
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking like status:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button className='button'>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>
      <div className="commonRow">
        <div className="liked">
          <div className="likedProfile"></div>
          <div className="likedProfile1"></div>
        </div>
        <span className="likeCount">
          {/* Display like count */}
          {post?.likes?.length || 0} likes
        </span>
      </div>
    </div>
  );
};

export default Like;
