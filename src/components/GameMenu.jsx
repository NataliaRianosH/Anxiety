import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/GameMenu.scss";
import {
  FaHome,
  FaUserCircle,
  FaMap,
  FaLock,
  FaEye,
  FaStop,
  FaTrophy,
  FaUserFriends,
  FaComment,
  FaVolumeUp,
  FaQuestionCircle,
  FaBars,
  FaVolumeMute,
  FaCog,
  FaSignOutAlt,
  FaRedo,
} from "react-icons/fa"; // Importamos iconos
import { useNavigate } from "react-router-dom";
import AchievementsModal from "./Achivements/AchievementsModal";
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";
import { useMindfulness } from "../context/MindfulnessContext";
import { useAchievements } from "../context/AchievementsContext";
import UserSidebar from "./UserSidebar";

const GameMenu = ({ isMuted, setIsMuted, volume, setVolume }) => {
  const { user, logout, reiniciarPartida } = useAuth();
  const { refetchAchievements } = useAchievements();
  const avatarUrl = user?.user_metadata?.avatar_url;
  const [showVolumePanel, setShowVolumePanel] = useState(false);
  const volumeRef = useRef(null);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [showGameMenu, setShowGameMenu] = useState(false);
  const gameMenuRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const { resetMindfulnessChallenge } = useMindfulness();
  const { resetPositiveChallenge } = usePositiveThoughts();
  if (avatarUrl) {
    //console.log("El usuario tiene imagen de perfil:", avatarUrl);
  } else {
    // console.log("El usuario NO tiene imagen de perfil.");
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target)) {
        setShowVolumePanel(false);
      }
      if (gameMenuRef.current && !gameMenuRef.current.contains(event.target)) {
        setShowGameMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleReiniciar = async () => {
    const ok = window.confirm("¿Seguro que quieres reiniciar la partida?");
    if (!ok) return;

    const res = await reiniciarPartida();
    if (res.success) {
      await refetchAchievements(); // recarga desde Supabase
      resetMindfulnessChallenge(); // ✅ limpia el minijuego 1
    resetPositiveChallenge();
      alert("Partida reiniciada");
    }
  };

  const { achievements } = useAchievements();
  const totalLogros = achievements.length;
  const logrosEncontrados = achievements.filter((a) => a.found).length;
  const porcentaje = !isNaN(logrosEncontrados / totalLogros)
    ? Math.round((logrosEncontrados / totalLogros) * 100)
    : 0;

  const nivel = 2;
  const progreso = 10;
  const {
    mindfulnessStarted,
    startMindfulness,
    endMindfulness,
    completeMindfulness,
  } = useMindfulness(); // PARA PROBAR MINIJUEGO DE MINDFULNESS

  const {
    positivechallengeStarted,
    startPositiveChallenge,
    endPositiveChallenge,
  } = usePositiveThoughts(); // para probar el minijuego de pensamientos
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="game-menu">
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
            {user?.user_metadata?.full_name || "Jugador"}
          </span>
          <div className="progress-container">
            <div
              className="progress-fill"
              style={{ width: `${porcentaje}%` }}
            ></div>
          </div>
          <span className="level">
            Logros {logrosEncontrados} de {totalLogros}
          </span>
        </div>
      </div>

      {/* Sección central */}
      <div className="menu-center">
        {/*<FaMap className="icon" />
        {/* <FaLock className="icon" />*/}
        <button
          className="achievements-button"
          onClick={() => setIsAchievementsOpen(true)}
        >
          <FaTrophy className="icon" /> Logros
        </button>
        {/*<FaUserFriends className="icon" />*/}
        {/* <FaComment className="icon" />
        {/* PARA PROBAR EL MINIJUEGO DE pensamientos positivos
        <button onClick={startPositiveChallenge}>
          <FaEye className="icon" /> 
        </button>
        <button className="stop-button" onClick={endPositiveChallenge}>
          <FaStop className="icon" /> 
        </button> 
        <button onClick={startMindfulness}>
          <FaEye className="icon" title="Minijuego mindfulness ON" />
        </button>
        <button className="stop-button" onClick={endMindfulness}>
          <FaStop className="icon" title="Minijuego mindfulness OFF" />
        </button>
        <button
          onClick={() => {
            completeMindfulness();
            endMindfulness();
          }}
        >
          <FaTrophy className="icon" title="Completar minijuego mindfulness" />
        </button>*/}
      </div>

      {/* Sección derecha */}
      <div className="menu-right">
        <button
          onClick={() => setShowVolumePanel((prev) => !prev)}
          className="icon-button"
        >
          {volume === 0 ? (
            <FaVolumeMute className="icon" />
          ) : (
            <FaVolumeUp className="icon" />
          )}
        </button>

        <FaQuestionCircle className="icon" />
        <button
          className="icon-button"
          onClick={() => setShowGameMenu((prev) => !prev)}
        >
          <FaBars className="icon" />
        </button>

        {showGameMenu && (
          <div className="game-dropdown" ref={gameMenuRef}>
            <p className="game-dropdown-title">Menú del juego</p>
            <ul className="game-dropdown-options">
              <li onClick={() => navigate("/profile")}>
                <FaHome className="dropdown-icon" />
                Home
              </li>
              <li onClick={() => handleReiniciar()}>
                <FaRedo className="dropdown-icon" />
                Reiniciar partida
              </li>
              <li className="logout" onClick={logout}>
                <FaSignOutAlt className="dropdown-icon" />
                Cerrar sesión
              </li>
            </ul>
          </div>
        )}

        {showVolumePanel && (
          <div className="volume-panel" ref={volumeRef}>
            <div className="volume-header">
              <span>Volumen</span>
              <button
                className="mute-button"
                onClick={() => {
                  if (volume === 0) {
                    setVolume(previousVolume || 50);
                  } else {
                    setPreviousVolume(volume);
                    setVolume(0);
                  }
                }}
              >
                {volume === 0 ? "Activar" : "Silenciar"}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
            <div className="volume-footer">
              {/** Música*/} <span></span>
              <span>{volume}%</span>
            </div>
          </div>
        )}
      </div>

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />
       <UserSidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

    </nav>
  );
};

export default GameMenu;
