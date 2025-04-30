import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginWithGoogle, login, user } = useAuth();
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(null); // Estado para el error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const errorMessage = await login(email, password); // Llamamos a la función de login

    if (errorMessage) {
      setError(errorMessage); // Establecemos el mensaje de error en el estado
    } else {
      navigate("/profile"); // Redirigimos al perfil si el login es exitoso
    }
  };

  return (
    <div className="login-page">

      <div className="wrapper">

        {/* Formulario de inicio de sesión con correo y contraseña */}
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Contraseña"

              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          {/* Link de "Olvidé la contraseña" */}
          <div className="remenber-forgot">
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button className="btn" type="submit">Iniciar sesión</button>

          <button className="btn" onClick={loginWithGoogle}>Iniciar sesión con Google</button>

          <div className="register-link">

            <p>
              ¿No tienes una cuenta? <a href="/register">Regístrate ahora</a>
            </p>

          </div>



        </form>




        {/* Mostrar errores si los hay */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {user && <p>Welcome, {user.email}</p>}
      </div>

    </div>

  );
};

export default Login;
