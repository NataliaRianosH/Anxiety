import React from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Importamos el contexto
import "../assets/styles/UserSidebar.scss";

const UserSidebar = ({ isOpen, closeSidebar }) => {
  const { user, partida } = useAuth(); // ✅ Extraemos la info del usuario desde el contexto

  return (
    <div className={`user-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={closeSidebar}>✖</button>
      
      {/* ✅ Información del usuario */}
      <div className="user-info">
        <h2>{user?.user_metadata?.full_name || "Jugador"}</h2>
        <p><strong>Email:</strong> {user?.email}</p>
        
        {/* ✅ Mostrar información del avatar si existe */}
        {partida ? (
          <>
            <p><strong>Avatar:</strong> {partida.avatar_name}</p>
            <p><strong>Skin:</strong> {partida.avatar_skin}</p>
            <p><strong>Progreso:</strong> {partida.progreso || 0}%</p>
          </>
        ) : (
          <p>No tienes una partida activa.</p>
        )}
      </div>
    </div>
  );
};

export default UserSidebar;
