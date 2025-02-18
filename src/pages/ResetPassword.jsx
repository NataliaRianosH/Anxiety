import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
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
    <div>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Actualizar contraseña</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
