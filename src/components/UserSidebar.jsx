import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaUser, FaCog, FaTrophy } from "react-icons/fa";
import "../assets/styles/UserSidebar.scss";
import InfoTab from "./UserTabs/InfoTab";
import SecurityTab from "./UserTabs/SecurityTab";
import StatsTab from "./UserTabs/StatsTab";

const UserSidebar = ({ isOpen, closeSidebar }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("informacion");
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className={`user-sidebar ${isOpen ? "open" : ""}`}>
      {/* Botón cerrar */}
      <button className="close-btn" onClick={closeSidebar}>
        ✖
      </button>

      {/* Sección superior */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">Perfil de Usuario</h2>
        <div className="avatar-icon">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Foto de perfil"
              className="sidebar-avatar"
              onError={(e) => {
                console.log(" Error cargando imagen. Mostrando ícono.");
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <FaUserCircle size={80} />
          )}
        </div>

        <h3 className="username">
          {user?.user_metadata?.full_name || "Jugador"}
        </h3>
      </div>

      {/* Sección central (menú + contenido) */}
      <div className="sidebar-middle">
        {/* Menú de pestañas */}
        <div className="sidebar-tabs">
          <button
            className={`tab-btn ${activeTab === "informacion" ? "active" : ""}`}
            onClick={() => setActiveTab("informacion")}
          >
            <FaUser className="tab-icon" /> Información
          </button>
          <button
            className={`tab-btn ${activeTab === "seguridad" ? "active" : ""}`}
            onClick={() => setActiveTab("seguridad")}
          >
            <FaCog className="tab-icon" /> Seguridad
          </button>
           {/*
          <button
            className={`tab-btn ${
              activeTab === "estadisticas" ? "active" : ""
            }`}
            onClick={() => setActiveTab("estadisticas")}
          >
            <FaTrophy className="tab-icon" /> Estadísticas
          </button>*/}
        </div>

        {/* Contenido */}
        <div>
          {activeTab === "informacion" && <InfoTab />}
          {activeTab === "seguridad" && <SecurityTab />}
         {/* { activeTab === "estadisticas" && <StatsTab />} */}
        </div>
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
