import React, { useState } from 'react';
import '../../assets/css/Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.example.com/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Guardar token en el localStorage o manejar la sesión como prefieras
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Nombre de usuario o contraseña incorrectos.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="body">
    <div className="login-container">
        <div className="logo-container">
        <img src="https://web.ceramicaitalia.com/log.png" alt="Logo" className="logo" />
        
      </div>
      <form onSubmit={handleLogin}>
      <hr/>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
