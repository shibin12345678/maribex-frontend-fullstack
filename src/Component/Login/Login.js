import React, { useState } from 'react';
import axios from 'axios';
import instagramLogoImage from "../Pics/Instagram_logo.svg.png";
import appstore from "../Pics/Google_Play_Store_badge_EN.svg.png";
import microsoft from  "../Pics/microsoft.png";
import facebook from "../Pics/facebook-f-logo-white-background-21.jpg";
import "../Login/Login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.maribex.site/api/signin", formData);
      const { _id, name, email, username } = response.data;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ _id, name, email, username }));
      localStorage.setItem('userId', _id);
      navigate('/'); // Redirect to homepage upon successful login
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        const errorMessage = error.response.data.error || 'An error occurred during login';
        setError(errorMessage);
      } else if (error.request) {
        // Request made but no response received
        setError('No response received from the server');
      } else {
        // Something happened in setting up the request
        setError('An error occurred while processing the request');
      }
    }
  }; 
  

  return (
    <>
      <div className='login-container'>
        <div className='box-1'>
          <div className='box-1-logo'>
            <img src={instagramLogoImage} alt="" className='instagram-logo' />
          </div>
          <form onSubmit={handleSubmit}> 
            <div className='input-x'>  
              <input type="text" name="username" placeholder='Phone number, username, or email address' className='input' required autoComplete='off' onChange={handleChange} />
            </div>
            <div className='input-x'>
              <input type="password" name="password" placeholder='Password' className='input' required autoComplete='off' onChange={handleChange} />
            </div>
            <div className='login-button-box'>
              <button type="submit" className='login-button'>Login</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
          <div className='lines-box'>
            <div className='line-1'></div>
            <div className='or-box'>OR</div>
            <div className='line-1'></div>
          </div>
          <div className='fb-box'>
            <span>
              <img src={facebook} alt="#" className='fb-logo' />
            </span>
            <p className='fb-link'> Log in with Facebook</p>
          </div>
          <div className="forgotten-password-box">
            <p className='forgotten-password-link'> Forgotten Your Password?</p>
          </div>
        </div>
        <div className='box-2'  onClick={()=>navigate("/registration")}>
          <p>Don't have an account? <span className='sign-up-span' >Sign up</span></p>
        </div>
        <div className='get-app-box'>
          <p>Get the app.</p>
        </div>
        <div className='app-store-google-play-box'>
          <img src={appstore} alt=""  className='app-store-image'/>
          <img src={microsoft} alt=""  className='microsoft-image'/>
        </div>
      </div>
    </>
  );
}

export default Login;
