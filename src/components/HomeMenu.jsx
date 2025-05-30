import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/HomeMenu.scss";
import {
  FaUserCircle,
  FaRedo,
  FaPlus,
  FaSignOutAlt,
  FaVolumeUp,
  FaQuestionCircle,
  FaBars,
} from "react-icons/fa"; // Importamos iconos
import UserSidebar from "./UserSidebar";
import { useAchievements } from "../context/AchievementsContext";
import HelpModal from "./modals/HelpModal"; "../components/modals/HelpModal";
const HomeMenu = () => {
  const { user, partida, reiniciarPartida, logout } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url;
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  if (avatarUrl) {
    //console.log("El usuario tiene imagen de perfil:", avatarUrl);
  } else {
    //console.log("El usuario NO tiene imagen de perfil.");
  }
  const { achievements } = useAchievements();
  const totalLogros = achievements.length;
  const logrosEncontrados = achievements.filter((a) => a.found).length;
  const porcentaje = !isNaN(logrosEncontrados / totalLogros)
    ? Math.round((logrosEncontrados / totalLogros) * 100)
    : 0;

  const navigate = useNavigate();

  const nivel = 20;
  const progreso = 10;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para mostrar/ocultar el menú

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); //Alternar el menú
  const closeSidebar = () => setIsSidebarOpen(false); //Cerrar el menú

  const handleReiniciarPartida = async () => {
    const confirmacion = window.confirm(
      " ¿Seguro que quieres reiniciar la partida? Perderás todo tu progreso."
    );
    if (confirmacion) {
      const result = await reiniciarPartida();
      if (result.success) {
        navigate("/game");
      } else {
        alert("Error al reiniciar la partida: " + result.error);
      }
    }
  };

  const iniciarNuevaPartida = () => {
    navigate("/game");
  };

  return (
    <nav className="home-menu">
      {/* Sección izquierda */}
      <div className="menu-left">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Foto de perfil"
            className="user-avatar"
            onClick={toggleSidebar}
            title="Abrir menú"
            onError={(e) => {
              console.log(
                "No se pudo cargar la imagen de perfil. Se mostrará el ícono."
              );
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <FaUserCircle
            className="icon user-icon"
            onClick={toggleSidebar}
            title="Abrir menú"
          />
        )}

        <div className="user-details">
          <span className="username">
            {user?.user_metadata?.full_name || "Jugador12"}
          </span>
          <div className="progress-container">
            <div
              className="progress-fill"
              style={{ width: `${porcentaje}%` }}
            ></div>
          </div>
          <span className="level">
            Logros {logrosEncontrados}/{totalLogros}
          </span>
        </div>
      </div>

      {/* Sección central */}
      <div className="menu-center">
        {/**<FaRedo className="icon" onClick={handleReiniciarPartida} title="Reiniciar Partida" />
        <button className="game-button" onClick={() => navigate("/game")}>
          Continuar Partida
        </button>*/}
        {/** <FaPlus className="icon" onClick={iniciarNuevaPartida} title="Nueva Partida" /> */}
      </div>

      {/* Sección derecha */}
      <div className="menu-right">
        <button
          className="icon-button"
          onClick={() => setIsHelpOpen(true)}
          title="Ayuda"
        >
          <FaQuestionCircle className="icon" />
        </button>
        <FaSignOutAlt
          className="icon "
          onClick={logout}
          title="Cerrar Sesión"
        />{" "}
        {/* Reemplazado FaBars */}
      </div>
      <UserSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />


    </nav>
  );
};

export default HomeMenu;
