import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import "../assets/styles/AchievementsModal.scss";
import AchievementCard from "./AchievementCard";
import achievementsData from "../pages/AchivementsData";
import AchievementDetails from "./AchievementDetails";

const AchievementsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [selectedAchievement, setSelectedAchievement] = useState(null);

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
        {/* Si hay un logro seleccionado, mostrar la vista de detalles */}
        {selectedAchievement ? (
          <AchievementDetails
            achievement={selectedAchievement} 
            onBack={() => setSelectedAchievement(null)} 
          />
        ) : (
          // Si no hay un logro seleccionado, mostrar todas las tarjetas
          <div className="achievements-grid">
            {achievementsData.map((achievement) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                onClick={() => setSelectedAchievement(achievement)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsModal;
