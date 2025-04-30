import React, { createContext, useState, useContext, useEffect } from "react";
import achievementsData from "../components/Achivements/AchivementsData";
import { useAuth } from "./AuthContext";
import { supabase } from "../supabase/client";

const AchievementsContext = createContext();

export const AchievementsProvider = ({ children }) => {
  const [achievements, setAchievements] = useState(achievementsData);
  const { user } = useAuth();

  useEffect(() => {
    const cargarLogros = async () => {
      if (!user) return;
  
      const { data, error } = await supabase
        .from("LogrosUsuario")
        .select("logro_id")
        .eq("user_id", user.id);
  
      if (error) {
        console.error("Error al cargar logros:", error.message);
        return;
      }
  
      const encontrados = data.map((item) => item.logro_id);
      setAchievements((prev) =>
        prev.map((logro) =>
          encontrados.includes(logro.id)
            ? { ...logro, found: true }
            : logro
        )
      );
    };
  
    cargarLogros();
  }, [user]);
  

  const collectAchievement = async (id) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === id ? { ...achievement, found: true } : achievement
      )
    );
  
    // Si hay sesión activa, guardar en Supabase
    if (user) {
      const { error } = await supabase
        .from("LogrosUsuario")
        .insert([{ user_id: user.id, logro_id: id }]);
  
      if (error) {
        console.error("Error guardando logro:", error.message);
      } else {
        console.log("Logro guardado en Supabase");
      }
    }
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
