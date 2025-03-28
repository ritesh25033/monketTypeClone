import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password
      });
      
      // Store token in localStorage
      localStorage.setItem('token', res.data.token);
      
      // Redirect to typing test page
      navigate('/typing-test');
    } catch (err) {
      setError(err.response.data.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
