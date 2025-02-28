import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Login() {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/chat');
    }
  }, []);

  const navigate = useNavigate();

  const handleValidation = () => {
    const { email, password } = value;
    if (email === '' || password === '') {
      toast.error('All fields are required');
      return false;
    }
    if(password.length < 8){
        toast.error('Password must be at least 8 characters long');
    }
    return true;
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
         const { email, password } = value;
         const { data } = await axios.post(`http://localhost:8000/api/auth/login`, {
          email,
          password,
         });
        const response = data.status;
        if (!response) {
          toast.error(data.message);
        }
         if (response) {
           localStorage.setItem('sociallens-user', JSON.stringify(data.Usercheck));
           navigate('/home');
         }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    }}>
      <form onSubmit={handleSubmit} style={{ 
        background: '#0f3460', 
        padding: '30px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', 
        width: '100%', 
        maxWidth: '400px', 
        textAlign: 'center',
      }}>
        <div className="brand" style={{ marginBottom: '20px' }}>
          {/* <img 
            src="https://drive.google.com/uc?export=view&id=1gjfMnwTSwVEcOwFoVxJVn3xq3L3vkMXl" 
            alt="Chatty Logo" 
            style={{ borderRadius: '50%', width: '70px', height: '70px', marginBottom: '10px' }} 
          /> */}
          <h1 style={{ color: '#f8f9fa', fontWeight: 'bold', fontSize: '20px' }}>Login into SocialLens</h1>
        </div>

        <input 
          type="email" 
          placeholder="Email" 
          name="email" 
          onChange={handleChange} 
          style={{ 
            width: '100%', 
            padding: '12px', 
            marginBottom: '15px', 
            borderRadius: '6px', 
            border: 'none', 
            background: '#e1e1e1', 
            color: '#333', 
            outline: 'none',
          }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          name="password" 
          onChange={handleChange} 
          style={{ 
            width: '100%', 
            padding: '12px', 
            marginBottom: '15px', 
            borderRadius: '6px', 
            border: 'none', 
            background: '#e1e1e1', 
            color: '#333', 
            outline: 'none',
          }} 
        />

        <button type="submit" style={{ 
          width: '100%', 
          padding: '12px', 
          background: '#00a8ff', 
          color: 'white', 
          borderRadius: '6px', 
          fontWeight: 'bold', 
          cursor: 'pointer', 
          transition: '0.3s',
          border: 'none'
        }}
        onMouseOver={(e) => e.target.style.background = '#0097e6'}
        onMouseOut={(e) => e.target.style.background = '#00a8ff'}>
          Submit
        </button>

        <span style={{ color: '#e1e1e1', marginTop: '10px', display: 'block' }}>
          Don’t have an account? <Link to="/register" style={{ color: '#00a8ff', textDecoration: 'underline' }}>Register</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
