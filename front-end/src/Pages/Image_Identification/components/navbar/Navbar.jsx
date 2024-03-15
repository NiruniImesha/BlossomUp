import "./navbar.scss";
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const headerStyle = {
    fontWeight: 'bold',
    color: '#40034f', // Dark purple color for the text
    // Remove textAlign since we're adjusting the layout with flexbox
  };

  // Style for the logout button
  const buttonStyle = {
    backgroundColor: '#d83cff', // Button color
    color: 'white', // Text color
    padding: '10px 20px', // Padding around text
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
    marginLeft: 'auto', // Pushes the button to the right
  };

  // Function to handle logout button click
  const handleLogoutClick = () => {
    navigate('/Loging'); // Navigate to the login page
  };

  return (
    <div className="navbar">
      <h1 style={headerStyle}>Dashboard</h1>
      {/* Moved the button to the right */}
      <button style={buttonStyle} onClick={handleLogoutClick}>Log out</button>
    </div>
  );
}

export default Navbar;
