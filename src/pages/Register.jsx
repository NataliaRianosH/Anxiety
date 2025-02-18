import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const { register, error } = useAuth(); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validación de contraseñas en el front-end
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Llamada al contexto para registrar al usuario
    await register(email, password, name);
  };

  return (
    <div className="login-page">
      <div className="wrapper">
      <form onSubmit={handleRegister}>
      <h1>Register</h1>
        
        <div className="input-box">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div  className="input-box" >
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirma tu contraseña"

            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn" type="submit">Register</button>

        <div className="register-link">

            <p>
              ¿Ya tienes una cuenta? <a href="/login">Inicia sesión ahora</a>
            </p>

          </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}


      </div>
      
    </div>
  );
};

export default Register;
