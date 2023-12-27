import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/FloriculturistDashboard.css';


function FloriculturistDashboard() {
  const [notification, setNotification] = useState(null);

  const displayNotification = (message) => {
    setNotification(message);
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      {notification && (
        <div className="notification">{notification}</div>
      )}

      <h1>Floriculturist Dashboard</h1>

      <Link to="/floriculturist-image-upload">
        <button>Go to Image Upload</button>
      </Link>
    </div>
  );
}

export default FloriculturistDashboard;
