import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import background from "../../../../images/Blossom.png"; // Make sure the path is correct

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('User_Name');
    const password = formData.get('User_Password');

    try {
      const response = await axios.post('http://localhost:3001/api/User/login', {
        User_Name: username,
        User_Password: password,
      });

      const is_InActive = response.data.is_InActive;
      const userStatus = response.data.User_Status;

      if (is_InActive === 'Active') {
        console.log('Active');
        if (userStatus === 'Admin') {
          console.log('Admin');
          navigate('/Admin-Dashboard');
        } else if (userStatus === 'Researcher') {
          console.log('Researcher');
        } else if (userStatus === 'Farmer') {
          console.log('Farmer');
        }
      } else if (is_InActive === 'InActive') {
        console.log('InActive');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg);
      } else {
        console.error('Server error:', error.message);
      }
    }
  };

  return (
    <div className="login-form-container">
      <form id="loginForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" name="User_Name" required /><br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="User_Password" required /><br /><br />
        <input type="submit" value="Login" />
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <style jsx>{`
        :root {
          --form-background-color: #ffffff;
          --primary-color: #800080; /* Updated to purple */
          --error-color: #dc3545;
          --button-hover-color: #6a0dad; /* Darker shade of purple for hover effect */
        }

        .login-form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-image: url(${background}); /* Use the imported image */
          background-size: cover;
          background-position: center;
        }

        form {
          padding: 2rem;
          background-color: var(--form-background-color);
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        input[type="text"],
        input[type="password"],
        input[type="submit"] {
          width: 100%; /* Ensure consistent sizing */
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        input[type="submit"] {
          background-color: var(--button-hover-color);
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        input[type="submit"]:hover {
          background-color: var(--primary-color);
        }

        .error-message {
          color: var(--error-color);
        }

        @media (max-width: 768px) {
          form {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
