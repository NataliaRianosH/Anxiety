import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(email);
    if (result.success) {
      setMessage("Correo enviado. Revisa tu bandeja de entrada.");
      setError("");
    } else {
      setError(result.error);
      setMessage("");
    }
  };

  return (
    <div className="login-page">
      
      <div className="wrapper">
      <form onSubmit={handleSubmit}>
      <h1>Recuperar contraseña</h1>
      <div className="input-box">

      <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      
      </div>

      
        <button className="btn" type="submit" style={{ marginTop: "0px" }}>Enviar enlace</button>

        <div className="register-link">

            <p>
              <a href="/login"> Volver al login</a>
            </p>

          </div>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      

      </div>
      
    </div>
  );
};

export default ForgotPassword;
