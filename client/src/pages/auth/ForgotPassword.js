import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => { // add logic to limit # of reset links to send
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/forgot-password', { email });
      console.log("response", response);
      if (response.status === 200) {
        setMessage(`If an account exists with ${email}, a password reset link will be sent.`);
        //setError('');
        // setTimeout(() => {
        //   navigate('/login');
        // }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage(`If an account exists with ${email}, a password reset link will be sent.`);
      
      } else {
        setError('Failed to send password reset link. Please try again.');
      }
      //setMessage('');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Email Address</h3>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="email"
            required
          />
        </label>
        <button type="submit" className="btn">Send Reset Link</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}        
      </form>
    </div>
  );
}
