import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../config/firebase'; // Import Firebase and Firestore
import '../css/Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [nic, setNIC] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  }

  const handleNICChange = (e) => {
    setNIC(e.target.value);
  }

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Create a document in the "users" collection with additional user details
        db.collection('users')
          .doc(user.uid)
          .set({
            name: name,
            mobile: mobile,
            nic: nic,
            // Add other user details here if needed
          })
          .then(() => {
            console.log('User registered and additional details saved:', user);
          })
          .catch((error) => {
            console.error('Error saving user details:', error);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <div className="signup-container">
      <h1>Create an Account</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={handleMobileChange}
      />
      <input
        type="text"
        placeholder="NIC (National ID Card)"
        value={nic}
        onChange={handleNICChange}
      />
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
      <button onClick={handleSignup}>Sign Up</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;
