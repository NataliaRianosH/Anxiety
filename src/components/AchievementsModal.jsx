import React from "react";
import { FaTrophy } from "react-icons/fa";
import "../assets/styles/AchievementsModal.scss";
import AchievementCard from "./AchievementCard";
import achievementsData from "../pages/AchivementsData";

const AchievementsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="achievements-modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="header-left">
            <FaTrophy className="trophy-icon" />
            <h2>Logros</h2>
          </div>
          <button className="close-button" onClick={onClose}>✖</button>
        </div>
        <div className="achievements-grid">
        {achievementsData.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}

        </div>


      </div>
    </div>
  );
};

export default AchievementsModal;
