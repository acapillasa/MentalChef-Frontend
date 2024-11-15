import React, { useState } from 'react';

const RegisterChef = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const userData = {
      username,
      email,
      password,
      passwordConfirm: confirmPassword,
    };

    try {
      const response = await fetch('/usuarios/registrarChef', {
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
      <form onSubmit={handleSubmit} className="register-form" autoComplete="off">
        <input type="text" name="hidden" style={{ display: 'none' }} autoComplete="off" />
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="new-username" 
            placeholder="Introduce tu usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="new-email" 
            placeholder="Introduce tu email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            autoComplete="off"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="new-password" 
            placeholder="Introduce tu contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            autoComplete="new-password"
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            name="new-confirm-password" 
            placeholder="Confirma tu contraseña" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
};

export default RegisterChef;
