import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../assets/styles/UserTabs/UserSecurityTab.scss";
import { useAuth } from "../../context/AuthContext";

const SecurityTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { updatePassword } = useAuth();
  const handleActualizar = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const result = await updatePassword(newPassword);

    if (result.success) {
      alert("Contraseña actualizada exitosamente.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="security-card">
      <h4 className="security-title">Cambiar Contraseña</h4>

      {/* Contraseña actual */}
      <div className="form-group">
        <label>Contraseña Actual</label>
        <div className="input-with-icon">
          <input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Nueva contraseña */}
      <div className="form-group">
        <label>Nueva Contraseña</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      {/* Confirmar contraseña */}
      <div className="form-group">
        <label>Confirmar Contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Botón */}
      <button className="update-button" onClick={handleActualizar}>
        Actualizar Contraseña
      </button>
    </div>
  );
};

export default SecurityTab;
