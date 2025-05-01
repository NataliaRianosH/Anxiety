import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("error=access_denied") || hash.includes("otp_expired")) {
      navigate("/recovery-error");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updatePassword(password);
    if (result.success) {
      //confirmar con ventana emergente
      setMessage("Contraseña actualizada");
      navigate("/login");

      alert("Contraseña actualizada");
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
        <h1>Restablecer contraseña</h1>

        <div className="input-box">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn" type="submit" style={{ marginTop: "0px" }}>Actualizar contraseña</button>

        <div className="register-link">
          <p>
            <a href="/login">Volver al login</a>
          </p>
        </div>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  </div>
  );
};

export default ResetPassword;
