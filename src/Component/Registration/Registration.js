import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import instagramLogoImage from '../Pics/Instagram_logo.svg.png';
import "../Registration/Registration.css"
import { useNavigate } from 'react-router-dom';


const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const  navigate=useNavigate(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.maribex.site/api/signup", formData);
      console.log('Registration successful:', response.data);
      navigate('/login');

      // Optionally, you can redirect the user to a different page after successful registration
    } catch (error) {
      console.error('Error during registration:', error.response.data);
    }
  };

  return (
    <>
      <div className='login-container'>
        <div className='box-1'>
          <div className='box-1-logo'>
            <img src={instagramLogoImage} alt="" className='instagram-logo' />
          </div>
          <div className='text'>
            <h6>Sign up to see photos and videos from your friends.</h6>
          </div>
          <div className='login-button-box'>
            <button className='login-button'>Log in with Facebook</button>
          </div>
          <div className='lines-box'>
            <div className='line-1'></div>
            <div className='or-box'>OR</div>
            <div className='line-1'></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='input-x'>
              <input type="text" name="email" placeholder='Mobile number or email address' className='input' required autoComplete='off' onChange={handleChange} />
            </div>
            <div className='input-x'>
              <input type="text" name="username" placeholder='Username' className='input' required autoComplete='off' onChange={handleChange} />
            </div>
            <div className='input-x'>
              <input type="password" name="password" placeholder='Password' className='input' required autoComplete='off' onChange={handleChange} />
            </div>
            <div className='paragraph-reg'>
              <p className='text-p'>
                People who use our service may have uploaded your contact information to Instagram. Learn more
                By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
              </p>
              <div className='login-button-box'>
                <button className='login-button' type='submit'>Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registration;
