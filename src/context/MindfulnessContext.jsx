import { createContext, useContext, useState } from "react";
import { useMiniGameManager } from "./MiniGamesManagerContext";
import { useAchievements } from "./AchievementsContext";

// 1. Crear el contexto
const MindfulnessContext = createContext();

// 2. Hook para acceder desde cualquier componente
export const useMindfulness = () => useContext(MindfulnessContext);

// 3. Provider del minijuego de mindfulness
export const MindfulnessProvider = ({ children }) => {
  const [mindfulnessStarted, setMindfulnessStarted] = useState(false);
  const [mindfulnessCompleted, setMindfulnessCompleted] = useState(false);
  const { resetMindfulnessAchievements, markMindfulnessAchievementsAsCompleted, removeMindfulnessAchievementsFromDB } = useAchievements(); 
  const { activeGame, setActiveGame, isAnyMinigameActive } =
    useMiniGameManager();
  const [phase, setPhase] = useState(1);

  // Función para iniciar el minijuego
  const startMindfulness = () => {
    if (isAnyMinigameActive || mindfulnessCompleted) return;
    setMindfulnessStarted(true);
    setMindfulnessCompleted(false);
    setActiveGame("mindfulness");
  };


  const completeMindfulness = () => {
    setMindfulnessCompleted(true);
    markMindfulnessAchievementsAsCompleted();
    setMindfulnessStarted(false);
    setPhase(1); 
    setActiveGame(null);
  };
  

  const endMindfulness = async () => {
    if (!mindfulnessStarted) {
      console.log("No se puede terminar el minijuego de mindfulness porque no ha sido iniciado.");
      return;
    }
  
    setMindfulnessStarted(false);
    setPhase(1); // Reinicia la fase
    resetMindfulnessAchievements(); // Limpiar logros del frontend
    await removeMindfulnessAchievementsFromDB(); // Eliminar de la base de datos
    setActiveGame(null);
  
    console.log("Minijuego mindfulness cancelado y reiniciado.");
  };

  const nextPhase = () => {
    setPhase((prev) => (prev < 6 ? prev + 1 : prev));
  };
  
  const resetMindfulnessChallenge = () => {
    setMindfulnessStarted(false);
    setMindfulnessCompleted(false);
    setPhase(1);
    setActiveGame(null);
  };
  
  const previousPhase = () => {
    setPhase((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <MindfulnessContext.Provider
      value={{
        mindfulnessStarted,
        mindfulnessCompleted,
        startMindfulness,
        completeMindfulness,
        endMindfulness,
        phase,
        nextPhase,
        previousPhase,
        resetMindfulnessChallenge
      }}
    >
      {children}
    </MindfulnessContext.Provider>
  );
};
