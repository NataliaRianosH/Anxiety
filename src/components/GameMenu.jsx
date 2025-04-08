import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/GameMenu.scss";
import { FaHome, FaUserCircle, FaMap, FaLock,FaEye,FaStop , FaTrophy, FaUserFriends, FaComment, FaVolumeUp, FaQuestionCircle, FaBars } from "react-icons/fa"; // Importamos iconos
import { useNavigate } from "react-router-dom";
import AchievementsModal from "./Achivements/AchievementsModal";
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";


const GameMenu = () => {
  const { user } = useAuth();
  const nivel = 2;
  const progreso = 10;

  const {positivechallengeStarted, startPositiveChallenge, endPositiveChallenge } = usePositiveThoughts();// para probar el minijuego de pensamientos
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
   const navigate = useNavigate();


  return (
    <nav className="game-menu">
      {/* Sección izquierda */}
      <div className="menu-left">
        <FaHome className="icon home-icon" onClick={() => navigate("/profile")} />
        <div className="divider"></div>
        <FaUserCircle className="icon user-icon" />
        <div className="user-details">
          <span className="username">{user?.user_metadata?.full_name || "Jugador"}</span>
          <div className="progress-container">
            <div
              className="progress-fill"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
          <span className="level">logros {nivel}</span>
        </div>
      </div>

      {/* Sección central */}
      <div className="menu-center">
        <FaMap className="icon" />
         {/* <FaLock className="icon" />*/}
         <button className="achievements-button" onClick={() => setIsAchievementsOpen(true)}>
          <FaTrophy className="icon" /> Logros
        </button>
         {/*<FaUserFriends className="icon" />*/}
        <FaComment className="icon" />
          {/* PARA PROBAR EL MINIJUEGO DE ANSIEDAD
        <button onClick={startPositiveChallenge}>
          <FaEye className="icon" /> 
        </button>
        <button className="stop-button" onClick={endPositiveChallenge}>
          <FaStop className="icon" /> 
        </button> */}
      </div>

      {/* Sección derecha */}
      <div className="menu-right">
        <FaVolumeUp className="icon" />
        <FaQuestionCircle className="icon" />
        <FaBars className="icon" />
      </div>

      <AchievementsModal isOpen={isAchievementsOpen} onClose={() => setIsAchievementsOpen(false)} />
    </nav>
  );
};

export default GameMenu;
