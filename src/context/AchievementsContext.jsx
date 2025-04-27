import React, { createContext, useState, useContext } from "react";
import achievementsData from "../components/Achivements/AchivementsData"; // Importamos la data original

const AchievementsContext = createContext();

export const AchievementsProvider = ({ children }) => {
  const [achievements, setAchievements] = useState(achievementsData);


  const collectAchievement = (id) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === id ? { ...achievement, found: true } : achievement
      )
    );
  };

  const resetMindfulnessAchievements = () => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) => {
        if (achievement.category === "mindfulness") {
          return { ...achievement, found: false };
        }
        return achievement;
      })
    );
  };

  const markMindfulnessAchievementsAsCompleted = () => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.category === "mindfulness"
          ? { ...achievement, found: true }
          : achievement
      )
    );
  };
  
  

  return (
    <AchievementsContext.Provider value={{ achievements, collectAchievement, resetMindfulnessAchievements, markMindfulnessAchievementsAsCompleted }}>
      {children}
    </AchievementsContext.Provider>
  );
};

// Hook personalizado para usar el contexto de logros
export const useAchievements = () => useContext(AchievementsContext);
