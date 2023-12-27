import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase'; // Import the Firebase authentication instance.
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      {error && <p>{error}</p>}


      <br />
      <br />
      <br />
      <br />

      {/* Buttons to navigate to the dashboards */}
      <Link to="/floriculturist-dashboard">
        <button>Floriculturist Dashboard</button>
      </Link>
      <br />
      <br />
      <br />
      <Link to="/researcher-dashboard">
        <button>Researcher Dashboard</button>
      </Link>

    </div>
  );
}

export default Login;
