


import React, { useEffect, useState } from 'react'
import "../Home/Post.css"
import dot from '../Assets/dot.png'
import comment from '../Assets/comment (.png'
import save from '../Assets/Save.png'
import notification from '../Assets/notification.png'
import messages from '../Assets/messages.png'
import person from '../Assets/me.png'
import { timeSince } from '../../Utils/Util'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { LuSend } from "react-icons/lu";
import Like from './Like'
import Comment from './Comment'
import { useNavigate } from 'react-router-dom'
import ViewallComment from './ViewallComment'

function Posted({ postId, userId }) {
    // const profailPic=localStorage.getItem("profilepic")
     const navigate=useNavigate();
       const user = JSON.parse(window.localStorage.getItem('user'))
  
  
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [commentText, setCommentText] = useState('');
   
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:9001/api/allpost");
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:9001/api/users");
        const data = await response.json();
       
        if (response.ok) {
          setUsers(data.Users);
        } else {
          setErrorMessage(data.error || 'Internal server error');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorMessage('Network error');
      }
    };
    fetchUsers();
  }, []);
  
  const handlePostComment = async (postId) => {
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
     
      setCommentText(''); 
    } catch (error) {
      console.error('Error posting comment:', error);
    
    }
  };

  return (
  <>
  <div className="main">
            <div className="container commonRow">
                <div className="post">
                    <div className="commonRow">
                       
                    {users.map((user, index) => (
    <div className="status" key={index}>
        <div>
            <img src={user.profilePic} alt="" className="subStatus" />
        </div>
        <div className="name">
        <a href={`/Users/${user._id}`} className="ellipsis" >{user.username}</a>
        </div>
    </div>
))}

                       
                       
                        
                       
                    </div>
                    <div>
                    {posts.map((post, index) => (
                        <div className="postContainer"  key={index}>
                       
                            <div className="postRow " >
                
                                <div className="commonRow">
                                    <div >
                                                <img  className="postProfile " src={post.postById.profilePic}  alt="" />
                                    </div>
                                    <div>
                                        <div>
                                            <span className="postName" onClick={()=>navigate(`/Users/${post.postById._id}`)}>{post.postById.username}</span>
                                            <span className="postDay"> {timeSince(new Date(post.createdAt))} Ago</span>
                                        </div>
                                        <span className="PostDesc">Beast Inside Beats • Vibes</span>
                                    </div>
                                </div>
                                <img src={dot} height="20px" /> 
                            </div>
                            <div>
                                <img src={post.image} height='500px'  className='img' /> 
                                <div className="postRow">
                                    <div className="activity" style={{display:"flex"}} >
                                        
                                      <Like postId={post._id}  userId={user._id}/>
                                      <Comment  postId={postId} userId={userId}  />
                    
                 
               <button  className='button'>
                <LuSend  />
               </button>
                                   
                                    </div>
                                    <img src={save} height='30px' />
                                </div>
                                <div className="commonRow">
                                    <div className="liked">
                                        <div className="likedProfile"></div>
                                        <div className="likedProfile1"></div>
                                    </div>
                                    <span className="likeCount">{post?.likes?.length} likes</span>
                                </div>
                                <div>
                                    <div>
                                        {/* <span className="postName" onClick={()=>navigate(`/Users/${post.postById._id}`)}>{post.postById.username}</span>
                                        <span className="postDay"> {post.body}</span> */}
                                           <ViewallComment />
                                    </div>
                                    <div>
                                        <div className="postRow">
                                            <span className="addComment">
                                            <input
          type="text"
          placeholder='Add a comment...'
          style={{ border: "none" }}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
                                                <button onClick={()=>handlePostComment(post._id)} style={{border:"none"}} id="btttttn">post</button>
                                            </span>
                                            <span className="emojiSize">☻</span>
                                        </div>
                                        <div className="commentBorder"></div>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                   
                        </div>
                         ))}
                    </div>
                    
                    
                </div>
                   
            
            

                <div className="suggestion">
                    <div className="postRow">
                        <div className="commonRow">
                           
                                <img src={user.profilePic} alt="" className="postProfile"/>
                       
                            <div className="suggestionProfile">
                            <a href={`/Users/${user._id}`} className="postName" >{user.username}</a><br/>
                               <a href={`/Users/${user._id}`} className="ellipsis" >{user.username}</a>
                            </div>
                        </div>
                        <div>Switch</div>
                    </div>
                    <div className="postRow Suggested">
                        <div>Suggested for you</div>
                        <div className="seeAll">See All</div>
                    </div>

             {/* all users */}
           
 <div>
      
    
      <div className="user-list">
        {users.map(user => (
          <div key={user._id} className="postRow pding">
            <div className="commonRow">
              <div>
                <img src={user.profilePic} alt=""  className="postProfile"/>
              </div>
              <div className="suggestionProfile">
              <a href={`/Users/${user._id}`} className="postName" >{user.username}</a><br/>
                <span className="followedBy">{user.followers.length} followers</span>
              </div>
            </div>
            <div className="switch">Follow</div>
          </div>
        ))}
      </div>
    </div>

                    
                </div>
            </div>
        </div>
  </>
  )
}

export default Posted
