import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const usernameCheckResponse = await fetch(`/usuarios/nombre/${username}`);
      if (!usernameCheckResponse.ok) {
        throw new Error('Error al comprobar el nombre de usuario');
      }

      const usernameExists = await usernameCheckResponse.json();
      if (usernameExists) {
        setError("El nombre de usuario ya está en uso");
        return;
      }
    } catch (error) {
      console.error('Error al comprobar el nombre de usuario:', error);
      setError('Ese nombre de usuario ya está en uso');
      return;
    }

    const userData = {
      username,
      email,
      password,
      passwordConfirm: confirmPassword,
    };

    try {
      const response = await fetch('/usuarios/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de registro');
      }

      const result = await response.json();
      console.log('Registro exitoso:', result);
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
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
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Introduce tu email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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

        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            name="confirm-password" 
            placeholder="Confirma tu contraseña" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>

        {error && <p className="text-red-600 bg-red-100 p-2 border border-red-600 rounded mt-2 mb-2">{error}</p>} {/* Display error message */}
        <button type="submit" className="register-btn">Register</button>
      </form>

      <div className="login-link">
        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
      </div>
    </div>
  );
};

export default Register;
