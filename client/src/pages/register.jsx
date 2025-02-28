import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Register() {
  const [value, setValue] = useState({
    username: '',
    email: '',
    phoneno:'',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleValidation = () => {
    const { username, email, phoneno, password, confirmPassword } = value;

    if (username === '' || email === '' || phoneno==='' || password === '' || confirmPassword === '') {
      toast.error('All fields are required');
      return false;
    } else if (confirmPassword !== password) {
      toast.error('Passwords do not match');
      return false;
    } else if (username.length < 3) {
      toast.error('Username must be at least 3 characters long');
      return false;
    } else if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }

    return true;
  };

//   useEffect(() => {
//     if (localStorage.getItem('chat-app-user')) {
//       navigate('/chat');
//     }
//   }, []);

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password,phoneno, username } = value;
      const { data } = await axios.post(`http://localhost:8000/api/auth/register`, {
        username,
        phoneno,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.message);
      }
      if (data.status === true) {
        localStorage.setItem('sociallens-user', JSON.stringify(data.user));
        navigate('/login');
      }
    }
  };

  return (
    <div className="container">
      <div className="register-box">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="header">
            <h1>Register to SocialLens</h1>
          </div>
          <input type="text" placeholder="Username" name="username" onChange={handleChange} />
          <input type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input type="text" placeholder="phoneno" name="phoneno" onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" onChange={handleChange} />
          <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} />
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
      <style>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #4f46e5, #9333ea);
        }
        .register-box {
          width: 90%;
          max-width: 400px;
          background: #1f2937;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .register-form {
          display: flex;
          flex-direction: column;
        }
        .header h1 {
          text-align: center;
          color: #ffffff;
          margin-bottom: 15px;
        }
        input {
          padding: 12px;
          margin-bottom: 10px;
          border: none;
          border-radius: 5px;
          background: #374151;
          color: white;
          outline: none;
        }
        input::placeholder {
          color: #9ca3af;
        }
        button {
          padding: 12px;
          background: #6366f1;
          border: none;
          color: white;
          font-weight: bold;
          cursor: pointer;
          border-radius: 5px;
          transition: 0.3s;
        }
        button:hover {
          background: #4f46e5;
        }
        span {
          text-align: center;
          color: #9ca3af;
          margin-top: 10px;
        }
        span a {
          color: #8b5cf6;
          text-decoration: none;
        }
        span a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Register;