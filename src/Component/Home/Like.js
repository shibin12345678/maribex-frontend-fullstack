import React, { useEffect, useState } from 'react';
import { FaRegHeart} from 'react-icons/fa';
import { FcLike } from "react-icons/fc";
import axios from 'axios';

const Like = ({ postId, userId }) => {
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://api.maribex.site/api/postId/${postId}`);
        //  console.log("responseeee",response)
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


  const handleLikeClick = async () => {
    try {
      if (!loading) {
        if (liked) {
          const response = await axios.post(`https://api.maribex.site/api/post/unlike/${postId}`, { userId  });
          if (response.status === 200) {
            setLiked(false);
            setPost(prevPost => ({ ...prevPost, likes: prevPost.likes.filter(like => like !== userId) }));
          } else {
            console.log('error unliking');
          }
        } else {
          await axios.post(`https://api.maribex.site/api/post/like/${postId}`, { userId  });
          setLiked(true);
          setPost(prevPost => ({ ...prevPost, likes: [...prevPost.likes, userId] }));
        }
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <div>
      <button className='button' onClick={handleLikeClick}>
        {liked ? <FcLike /> :<FaRegHeart />}
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
