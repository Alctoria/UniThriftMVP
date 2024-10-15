import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', { username, password });
      localStorage.setItem('token', res.data.token);
      // Redirect or update state
    } catch (err) {
      setError(err.response.data.msg || 'An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;