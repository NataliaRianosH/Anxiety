import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import "../assets/styles/UserSidebar.scss";

const UserSidebar = ({ isOpen, closeSidebar }) => {
  const { user } = useAuth();

  return (
    <div className={`user-sidebar ${isOpen ? "open" : ""}`}>
      {/* Botón cerrar */}
      <button className="close-btn" onClick={closeSidebar}>✖</button>

      {/* Sección superior */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">Perfil de Usuario</h2>
        <div className="avatar-icon">
          <FaUserCircle size={80} />
        </div>
        <h3 className="username">{user?.user_metadata?.full_name || "Jugador"}</h3>
      </div>

      {/* Sección central (menú + contenido) */}
      <div className="sidebar-middle">
        <div className="sidebar-menu-placeholder">IRÁ EL MENÚ</div>
        <div className="sidebar-content-placeholder">EL CONTENIDO</div>
      </div>
      <div className="sidebar-divider"></div>
      {/* Botón cerrar sesión */}
      <button className="logout-button">
        <span>↪</span> Cerrar Sesión
      </button>
    </div>
  );
};

export default UserSidebar;
