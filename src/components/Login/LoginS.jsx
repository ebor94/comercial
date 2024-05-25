import React, { useState } from 'react';
import '../../assets/css/Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [intentos, setIntentos] = useState(4);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
 

      const raw = JSON.stringify({
        "usuario": username.toUpperCase(),
        "codvend": "",
        "password": password
      });

   
      const response = await fetch("https://lilix.ceramicaitalia.com:3001/loginsap/", {method: "POST", headers: {'Content-Type': 'application/json'}, body : raw} )
       
        const result = await response.json();
        console.log(result)
      if (result.succes) {
        // Guardar token en el localStorage o manejar la sesión como prefieras
        localStorage.setItem('token', result.token);
        let infoComercial = result.data
        infoComercial.forEach(item =>{
          if(item.parid === 'BZI')localStorage.setItem('zona', item.parva);
          if(item.parid === 'VKB')localStorage.setItem('ofiventas', item.parva);
          if(item.parid === 'VKG')localStorage.setItem('codvend', item.parva);
          if(item.parid === 'VKO')localStorage.setItem('orgventas', item.parva);
          if(item.parid === 'VTW')localStorage.setItem('canal', item.parva);
          if(item.parid === 'WRK')localStorage.setItem('centro', item.parva);
        })
        
        navigate('/Home');
      } else {
        setIntentos(intentos - 1)
        if(intentos === 0){
          setError(`Usuario Bloqueado validar Con TI para desbloquear.`);
        }else{
          setError(`Nombre de usuario o contraseña incorrectos, te quedan ${intentos}.`);
        }
        
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
