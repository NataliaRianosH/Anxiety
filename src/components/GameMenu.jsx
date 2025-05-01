import React, { useState } from "react";
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
} from "react-icons/fa"; // Importamos iconos
import { useNavigate } from "react-router-dom";
import AchievementsModal from "./Achivements/AchievementsModal";
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";
import { useMindfulness } from "../context/MindfulnessContext";
import { useAchievements } from "../context/AchievementsContext";

const GameMenu = ({ isMuted, setIsMuted }) => {
  const { user } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url;

  if (avatarUrl) {
    //console.log("El usuario tiene imagen de perfil:", avatarUrl);
  } else {
   // console.log("El usuario NO tiene imagen de perfil.");
  }

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
        <FaHome
          className="icon home-icon"
          onClick={() => navigate("/profile")}
        />
        <div className="divider"></div>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Foto de perfil"
            className="user-avatar"
            onError={(e) => {
              console.log(
                "No se pudo cargar la imagen de perfil. Se mostrará el ícono."
              );
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <FaUserCircle className="icon user-icon" />
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
            Logros {logrosEncontrados}/{totalLogros}
          </span>
        </div>
      </div>

      {/* Sección central */}
      <div className="menu-center">
        <FaMap className="icon" />
        {/* <FaLock className="icon" />*/}
        <button
          className="achievements-button"
          onClick={() => setIsAchievementsOpen(true)}
        >
          <FaTrophy className="icon" /> Logros
        </button>
        {/*<FaUserFriends className="icon" />*/}
        <FaComment className="icon" />
        {/* PARA PROBAR EL MINIJUEGO DE pensamientos positivos
        <button onClick={startPositiveChallenge}>
          <FaEye className="icon" /> 
        </button>
        <button className="stop-button" onClick={endPositiveChallenge}>
          <FaStop className="icon" /> 
        </button> */}
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
        </button>
      </div>

      {/* Sección derecha */}
      <div className="menu-right">
        <button onClick={() => setIsMuted(!isMuted)} className="icon-button">
          {isMuted ? (
            <FaVolumeMute className="icon" />
          ) : (
            <FaVolumeUp className="icon" />
          )}
        </button>

        <FaQuestionCircle className="icon" />
        <FaBars className="icon" />
      </div>

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />
    </nav>
  );
};

export default GameMenu;
