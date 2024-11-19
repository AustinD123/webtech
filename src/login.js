import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

function AuthPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3002/auth', {
        email,
        password
      });

      if (response.data.success) {
        setMessage(response.data.message);
        onLoginSuccess(); // Trigger the App function when the user is successfully logged in
      } else {
        setMessage(response.data.message); // Show error message if login fails
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Login</h1>
        {message && <div className="message">{message}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="buttonGroup">
            <button className="button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
