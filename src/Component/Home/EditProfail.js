import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import "../Home/EditProfail.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const EditProfail = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    image: null
  });
  
  const [updatedImageURL, setUpdatedImageURL] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('profilePic', formData.image); // Use 'profilePic' key to match the backend

      const id = localStorage.getItem('userId');

      const response = await axios.patch(`http://localhost:9001/api/updateProfile/${id}`, formDataToSend, {

        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response,"deee")
      const updatedImageURL = response.data.user?.profilePic;
      setUpdatedImageURL(updatedImageURL); // Set the updated image URL
      localStorage.setItem('profilepic',updatedImageURL)
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className='editPrifail-container'>
        <h1 className='heading'> Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <div className='pic-box'>
            <div className='innersection'>
           <img className="image" src={updatedImageURL} alt="" /> {/* Conditionally render the image */}
            </div>
            <div className='btn-div'>
              <input className='btnp' type='file' required autoComplete='off' name='image' onChange={handleImageChange} />
            </div>
          </div>
          <div>
            <h1 className='hed'>Username</h1>
            <div>
              <input type="text" className='input-web' placeholder='username' autoComplete='off' name='username' onChange={handleChange} />
            </div>
            <span style={{ fontSize: "12px" }}>Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.</span>
            <h1 className='hed'> Bio</h1>
            <textarea className='textarea' name='bio' onChange={handleChange}></textarea>
          </div>
          <div>
            <h1 className='hed'>Email</h1>
            <div>
              <input type="email" className='input-web' placeholder='email' autoComplete='off' name='email' onChange={handleChange} />
            </div>
          </div>
          <div className='submitBtn'>
            <button className='bttn' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfail;
