import { useNavigate } from "react-router-dom";

const RecoveryError = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h2>Enlace no válido o expirado</h2>
      <p>El enlace de recuperación que usaste ha caducado o es inválido.</p>
      <button onClick={() => navigate("/forgot-password")}>
        Volver a solicitar recuperación
      </button>
    </div>
  );
};

export default RecoveryError;
