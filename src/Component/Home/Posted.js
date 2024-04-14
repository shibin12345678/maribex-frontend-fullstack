


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

function Posted() {
    const profailPic=localStorage.getItem("profilepic")
     const navigate=useNavigate();
       const user = JSON.parse(window.localStorage.getItem('user'))
  const userId=user._id
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
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

  return (
  <>
  <div className="main">
  
            <div className="container commonRow">
                <div className="post">
                    <div className="commonRow">
                        <div className="status">
                            <div className="subStatus"></div>
                            <div className="name">
                                <span className="ellipsis">Kishore</span>
                            </div>
                        </div>
                        <div className="status">
                            <div className="subStatus"></div>
                            <div className="name">
                                <span className="ellipsis">Kishore</span>
                            </div>
                        </div>
                        <div className="status">
                            <div className="subStatus"></div>
                            <div className="name">
                                <span className="ellipsis">Kishore</span>
                            </div>
                        </div>
                        <div className="status">
                            <div className="subStatus"></div>
                            <div className="name">
                                <span className="ellipsis">Kishore</span>
                            </div>
                        </div>
                        <div className="status">
                            <div className="subStatus"></div>
                            <div className="name">
                                <span className="ellipsis">Kishore</span>
                            </div>
                        </div>
                        <div className="status">
                            <div className="subStatus"></div>
                            <div className="name">
                                <span className="ellipsis">Kishore</span>
                            </div>
                        </div>
                        <div className="status">
                            <div className="subStatus"></div>
                            <div className="name">
                                <span className="ellipsis">Kishore</span>
                            </div>
                        </div>
                        <div className="status">
                            <div className="subStatus"></div>
                            <div className="name">
                                <span className="ellipsis">Kishore</span>
                            </div>
                        </div>
                    </div>
                    <div>
                    {posts.map((post, index) => (
                        <div className="postContainer"  key={index}>
                       
                            <div className="postRow " >
                
                                <div className="commonRow">
                                    <div >
                                                <img  className="postProfile " src={profailPic} alt="" />
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
                                        
                                      <Like postId={post._id} />
                                      <Comment/>
                    
                 
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
                                    <span className="likeCount">{post.likes.length} likes</span>
                                </div>
                                <div>
                                    <div>
                                        <span className="postName" onClick={()=>navigate(`/Users/${post.postById._id}`)}>{post.postById.username}</span>
                                        <span className="postDay"> {post.body}</span>
                                    </div>
                                    <div>
                                        <div className="postRow">
                                            <span className="addComment">Add a comment...</span>
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
                            <div className="postProfile"></div>
                            <div className="suggestionProfile">
                                <span className="postName">{user.username}</span><br/>
                                <span className="postDay">{user.username}</span>
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
              <div className="postProfile"></div>
              <div className="suggestionProfile">
                <span className="postName" onClick={()=>navigate("/Users")}>{user.username}</span><br/>
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
