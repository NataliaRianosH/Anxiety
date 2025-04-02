import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../assets/styles/UserTabs/UserSecurityTab.scss";

const SecurityTab = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="security-card">
      <h4 className="security-title">Cambiar Contraseña</h4>

      {/* Contraseña actual */}
      <div className="form-group">
        <label>Contraseña Actual</label>
        <div className="input-with-icon">
          <input type={showPassword ? "text" : "password"} />
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
        <input type="password" />
      </div>

      {/* Confirmar contraseña */}
      <div className="form-group">
        <label>Confirmar Contraseña</label>
        <input type="password" />
      </div>

      {/* Botón */}
      <button className="update-button">Actualizar Contraseña</button>
    </div>
  );
};

export default SecurityTab;
