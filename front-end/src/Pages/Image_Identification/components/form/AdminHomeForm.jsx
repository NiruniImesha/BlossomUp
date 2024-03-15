import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import background from "../../../../images/Blossom.png"; // Make sure the path is correct

const AdminHomeForm = () => {
  
  return (
    <div className="login-form-container">
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
        @media (max-width: 768px) {
          form {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminHomeForm;
