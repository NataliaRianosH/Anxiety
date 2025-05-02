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
  
    if (user) {
      // Verificar si ya existe antes de insertar
      const { data: existing, error: fetchError } = await supabase
        .from("LogrosUsuario")
        .select("id")
        .eq("user_id", user.id)
        .eq("logro_id", id)
        .maybeSingle();
  
      if (fetchError) {
        console.error("Error verificando si ya existe el logro:", fetchError.message);
        return;
      }
  
      if (existing) {
        console.log("El logro ya estaba registrado, no se vuelve a insertar");
        return;
      }
  
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
  
  const refetchAchievements = async () => {
    if (!user) return;
  
    const { data, error } = await supabase
      .from("LogrosUsuario")
      .select("logro_id")
      .eq("user_id", user.id);
  
    if (error) {
      console.error("Error al recargar logros:", error.message);
      return;
    }
  
    const encontrados = data.map((item) => item.logro_id);
    setAchievements((prev) =>
      prev.map((logro) =>
        encontrados.includes(logro.id)
          ? { ...logro, found: true }
          : { ...logro, found: false }
      )
    );
  };

  const removeMindfulnessAchievementsFromDB = async () => {
    if (!user) return;
  
    const mindfulnessIds = achievements
      .filter((a) => a.category === "mindfulness")
      .map((a) => a.id);
  
    const { error } = await supabase
      .from("LogrosUsuario")
      .delete()
      .eq("user_id", user.id)
      .in("logro_id", mindfulnessIds);
  
    if (error) {
      console.error("Error al eliminar logros de mindfulness:", error.message);
    } else {
      console.log(" Logros de mindfulness eliminados de la base de datos.");
    }
  };
  
  

  return (
    <AchievementsContext.Provider value={{ achievements,refetchAchievements, collectAchievement, resetMindfulnessAchievements, markMindfulnessAchievementsAsCompleted,  removeMindfulnessAchievementsFromDB }}>
      {children}
    </AchievementsContext.Provider>
  );
};

// Hook personalizado para usar el contexto de logros
export const useAchievements = () => useContext(AchievementsContext);
