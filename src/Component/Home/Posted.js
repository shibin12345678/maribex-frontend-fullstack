// // Post.js


// import "../Home/Post.css"
// import { BsThreeDots } from "react-icons/bs";
// import { FaRegHeart } from "react-icons/fa";
// import { LuSend } from "react-icons/lu";
// import { MdSaveAlt } from "react-icons/md";
// import { MdOutlineEmojiEmotions } from "react-icons/md";
// import { FaRegComment } from "react-icons/fa";
// import { timeSince } from '../../Utils/Util';


// const Post = () => {
//    const user = JSON.parse(window.localStorage.getItem('user'))
//   const userId=user._id
    
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("http://localhost:9001/api/allpost");
//         const data = await response.json();
//         setPosts(data.posts);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className='post-list'>
//       {posts.map(post => (
//         <div key={post._id} className='post'>
//           <div className='p_d'>
//             <div className='p_inner'>
//               <img className='p_p' src={post.postById.profilePic} alt="User profile" />
//               <a href="#" style={{ textDecoration: "none" }}>
//                 <p className='p_name'>{post.postById.username}</p>
//               </a>
//             </div>
//             <BsThreeDots className='threedots' />
//           </div>
//           <div className='p_image'>
//             <img className='pp_full' src={post.image} alt="Post" />
//           </div>
//           <div className='reaction_icon'>
//             <div className='left_i'>
//               <button className='reactionbtn'>
//                 <FaRegHeart className='hearticon' />
//               </button>
//               <button className='reactionbtn'>
//                 <FaRegComment className='hearticon' />
//               </button>
//               <button className='reactionbtn'>
//                 <LuSend className='hearticon' />
//               </button>
//             </div>
//             <div className='right_i'>
//               <button className='reactionbtn'>
//                 <MdSaveAlt className='hearticon' />
//               </button>
//             </div>
//           </div>
//           <h6 className='numlike'>{post.likes} likes </h6>
//           <span className='posttitle'>{post.title}</span>
//           <span className='postbody'>{post.body}</span>
//           <br />
//           <button type='button' className='viewcommentbtn'>
//             View all comment
//           </button>
//           <div style={{ overflowY: "scroll", maxHeight: "85px" }}>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h6>
//                 <a href="#" style={{ textDecoration: "none" }} className='comment'>
//                   <img src="" alt="Commenter avatar" className='commentview' />
//                   <span style={{ fontWeight: "400", marginLeft: "8px" }}></span>
//                 </a>
               
               
//               </h6>
//             </div>
//           </div>
//           <p className='postdata'>
//             {timeSince(new Date(post.createdAt))} Ago
//           </p>
//           <div className='comment_section'>
//             <div className='input_box'>
//               <input type="text" className='input_c' placeholder='Add a comment ...' />
//             </div>
//             <div className='c_text'>
//               <MdOutlineEmojiEmotions />
//               <button>Post</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Post;


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
                                    <div className="postProfile"></div>
                                    <div>
                                        <div>
                                            <span className="postName" onClick={()=>navigate("/Users")}>{post.postById.username}</span>
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
                                        <span className="postName" onClick={()=>navigate("/Users")}>{post.postById.username}</span>
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
