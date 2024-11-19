import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username, password };
    console.log('Request Payload:', payload);

    try {
      const response = await fetch('/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include', // Ensure credentials are included
      });

      console.log('Request Headers:', {
        'Content-Type': 'application/json',
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);
      console.log('Response Status:', response.status);

      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(responseText);
        console.log('Logged in:', data);
      } else if (contentType && contentType.includes('text/plain')) {
        console.log('Logged in:', responseText);
      } else {
        throw new Error('Unexpected response format');
      }

      setIsLoggedIn(true); // Ensure the state is set to true
      navigate('/MiCocina');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Introduce tu usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Introduce tu contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <button type="submit" className="login-btn">Login</button>
      </form>

      <div className="register-link">
        <p>No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p> {/* Display register link */}
      </div>
    </div>
  );
};

export default Login;
