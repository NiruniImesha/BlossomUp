import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ResearcherDashboard.css';

function ResearcherDashboard() {
  return (
    <div>
      <h1>Researcher Dashboard</h1>

      <Link to="/researcher-images-list">
        <button>Go to Received Image List</button>
      </Link>
    </div>
  );
}

export default ResearcherDashboard;
