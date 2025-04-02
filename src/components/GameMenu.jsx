import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/GameMenu.scss";
import { FaHome, FaUserCircle, FaMap, FaLock,FaEye,FaStop , FaTrophy, FaUserFriends, FaComment, FaVolumeUp, FaQuestionCircle, FaBars } from "react-icons/fa"; // Importamos iconos
import AchievementsModal from "./AchievementsModal";
import { useAnxiety } from "../context/AnxietyContext";


const GameMenu = () => {
  const { user } = useAuth();
  const nivel = 2;
  const progreso = 10;
  const { anxietyAttack, startAnxietyAttack, endAnxietyAttack } = useAnxiety();
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);


  return (
    <nav className="game-menu">
      {/* Sección izquierda */}
      <div className="menu-left">
        <FaHome className="icon home-icon" />
        <div className="divider"></div>
        <FaUserCircle className="icon user-icon" />
        <div className="user-details">
          <span className="username">{user?.name || "Jugador123"}</span>
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
        <button onClick={startAnxietyAttack}>
          <FaEye className="icon" /> 
        </button>
        <button className="stop-button" onClick={endAnxietyAttack}>
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
