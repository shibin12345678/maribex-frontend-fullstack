import React, { useState } from 'react';
import "../CreatePost/CreatePost.css";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import axios from "axios";
import Sidebar from '../Sidebar/Sidebar';

export const Createpost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null); // State for storing image file

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleBodyChange = (event) => setBody(event.target.value);
    const handleImageChange = (event) => setImage(event.target.files[0]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('image', image);
            const id = localStorage.getItem('userId')
            // Send formData to backend API using axios
            const response = await axios.post(`https://api.maribex.site/api/createpost/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            toast.success("Post created successfully!"); // Display success toast
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
          <>
            <Sidebar/>
        <div className='container postcontainer'>
            <form onSubmit={handleSubmit} className='row postform'>
                <div className='col-sm-12 d-flex'>
                    <div className='login-card card-block'>
                        <div className='login-card card-block'>
                            <div className='authbox'>
                                <div className='col-12'>
                                    <ToastContainer /> {/* ToastContainer should be placed here */}
                                    <h2 className='text-center'>Create Post</h2>
                                    <br />
                                    <div className='input-group'>
                                        <input type="text" placeholder="Title" className="form-control" required
                                            autoComplete='off' value={title} onChange={handleTitleChange} />
                                    </div>
                                    <div className='input-group'>
                                        <input type="text" placeholder="Description" className="form-control" required
                                            autoComplete='off' value={body} onChange={handleBodyChange} />
                                    </div>
                                    <div className='file-field input-field'>
                                        <input type="file" className="form-control" required
                                            autoComplete='off' name='image' onChange={handleImageChange} />
                                    </div>
                                    <br />
                                    <div className='m-t-20'>
                                        <button className='btn btn-primary' type='submit' >Submit Post</button>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
};

export default Createpost;
