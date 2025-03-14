import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import "../assets/styles/AchievementsModal.scss";
import AchievementCard from "./AchievementCard";
import AchievementDetails from "./AchievementDetails";
import { useAchievements } from "../context/AchievementsContext"; 

const AchievementsModal = ({ isOpen, onClose }) => {
  const { achievements } = useAchievements();
  if (!isOpen) return null;


  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return (
    <div className="achievements-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Logros</h2>
          <button className="close-button" onClick={onClose}>✖</button>
        </div>

        {/* Si hay un logro seleccionado, mostrar los detalles */}
        {selectedAchievement ? (
          <AchievementDetails 
            achievement={selectedAchievement} 
            onBack={() => setSelectedAchievement(null)} 
          />
        ) : (
          // Si no hay un logro seleccionado, mostrar las tarjetas
          <div className="achievements-grid">
            {achievements.map((achievement) => (
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