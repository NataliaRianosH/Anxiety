import React from "react";
import { FaTrophy } from "react-icons/fa";
import "../assets/styles/AchievementsModal.scss";
import AchievementCard from "./AchievementCard";
import { useAchievements } from "../context/AchievementsContext"; 
const AchievementsModal = ({ isOpen, onClose }) => {
  const { achievements } = useAchievements();
  if (!isOpen) return null;

  return (
    <div className="achievements-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Logros</h2>
          <button className="close-button" onClick={onClose}>✖</button>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsModal;
