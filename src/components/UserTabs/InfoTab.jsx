import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import "../../assets/styles/UserTabs/UserInfoTab.scss";
import { useAuth } from "../../context/AuthContext";

const InfoTab = () => {
  const { user, partida, actualizarNombreAvatar } = useAuth();
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(partida?.avatar_name || "");

  const handleGuardar = async () => {
    if (!nuevoNombre.trim()) return alert("El nombre no puede estar vacío");
    const result = await actualizarNombreAvatar(nuevoNombre);
    if (result.success) {
      setEditando(false);
    } else {
      alert("Error al guardar: " + result.error);
    }
  };

  return (
    <div className="info-card">
      <div className="info-row">
        <span className="label">Email:</span>
        <span className="value">{user?.email || "No disponible"}</span>
      </div>

      <div className="info-row">
        <span className="label">Avatar:</span>
        {editando ? (
          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            className="avatar-input"
          />
        ) : (
          <span className="value">{partida?.avatar_name || "No asignado"}</span>
        )}
      </div>

      <div className="info-row">
        <span className="label">Skin:</span>
        <span className="value">{partida?.avatar_skin || "No asignado"}</span>
      </div>

      <div className="info-row">
        <span className="label">Progreso:</span>
        <span className="value">0%</span>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: "0%" }}></div>
      </div>

      <div className="edit-button-container">
        {editando ? (
          <button className="edit-button" onClick={handleGuardar}>
            <FaSave size={12} />
            Guardar
          </button>
        ) : (
          <button className="edit-button" onClick={() => setEditando(true)}>
            <FaEdit size={12} />
            Nombre del avatar
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoTab;
