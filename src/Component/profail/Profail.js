import React, { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";
import "./profail.css";
import { useNavigate } from "react-router-dom";
import ProfailImage from "./ProfailImage";
import { Modal } from '@mui/material';
import { Box } from "@mui/material";

const Profail = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        height: 500,
        bgcolor: 'background.paper',
        border: "none",
        boxShadow: 24,
        overflowY: "scroll",
        p: 4,
    };

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [followingList, setFollowingList] = useState([]); // State to store the following list
    const navigate = useNavigate();

    const handleOpen = async () => {
        setOpen(true);
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:9001/api/followinglist/${userId}`);
            setFollowingList(response.data.user.following);
        } catch (error) {
            console.error("Error fetching following list:", error);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:9001/api/getUser/${userId}`);
                setUser(response.data.user);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:9001/api/post/${userId}`);
                setPosts(response?.data?.posts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };
        fetchUserPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Sidebar />
            <div className="profail-main-container">
                <div className=" dp-image-conainer">
                    <img
                        src={user?.profilePic}
                        alt=""
                        className="dp_image"
                    />
                </div>
                <div className="dp-side-box">
                    <span className="idd-name">{user.username}</span>
                    <div>
                        <button className="butns" onClick={() => navigate("/EditProfail")}>Edit Profail</button>
                        <button className="butns">View archive</button>
                        <button className="butns">Ad tools</button>
                    </div>
                </div>
            </div>
            <div className="second-sec">
                <button className="item">{posts.length} <span>post</span></button>
                <button className="item">{user.followers.length}<span>followers</span></button>
                <button className="item" onClick={handleOpen}>{user.following.length}<span>following</span></button>
                <Modal
                    className='modall'
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div>
                            <div style={{ border: "1px solid black", textAlign: "center" }} >
                                <h2 style={{ fontSize: "15px", marginTop: "10px", fontWeight: "600" }}>Following</h2>
                            </div>
                            <div>
                                {followingList.map((followingUser) => (
                                    <div key={followingUser._id} className='userContainer'>
                                        <img src={followingUser.profilePic} className='chatUserImg' alt='' />
                                        <div style={{ marginLeft: "10px" }} className='uuu'>
                                            <p style={{ textAlign: "start", marginTop: "10px", fontSize: "15px" }} className='ttt'>{followingUser.username}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
            <div className="dicription">
                <p>{user?.bio}</p>
            </div>
            <div className="footer">
                <div>
                    <button className="item-btn">POSTS</button>
                </div>
                <div>
                    <button className="item-btn">SAVED</button>
                </div>
                <div>
                    <button className="item-btn">TAGGED</button>
                </div>
            </div>
            <div className="3-section">
                <ProfailImage />
                <div className="saved"></div>
                <div className="taged"></div>
            </div>
        </>
    );
};

export default Profail;
