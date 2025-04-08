import { createContext, useContext, useState } from "react";
import { useMiniGameManager } from "./MiniGamesManagerContext";

// 1. Crear el contexto
const MindfulnessContext = createContext();

// 2. Hook para acceder desde cualquier componente
export const useMindfulness = () => useContext(MindfulnessContext);

// 3. Provider del minijuego de mindfulness
export const MindfulnessProvider = ({ children }) => {
  const [mindfulnessStarted, setMindfulnessStarted] = useState(false);
  const [mindfulnessCompleted, setMindfulnessCompleted] = useState(false);
  const { activeGame, setActiveGame, isAnyMinigameActive } = useMiniGameManager();

  // Función para iniciar el minijuego
  const startMindfulness = () => {
    if (isAnyMinigameActive) {
      console.log("No se puede iniciar el minijuego de mindfulness porque ya hay otro activo.");
      return;
    }

    setMindfulnessStarted(true);
    setMindfulnessCompleted(false);
    setActiveGame("mindfulness");
    console.log(" Minijuego mindfulness iniciado");
  };

  // Función para completarlo
  const completeMindfulness = () => {
    setMindfulnessCompleted(true);
    console.log(" Minijuego mindfulness completado");
  };

  // Función para salir del minijuego
  const endMindfulness = () => {
    setMindfulnessStarted(false);
    setActiveGame(null);
    console.log(" Minijuego mindfulness terminado");
  };

  return (
    <MindfulnessContext.Provider
      value={{
        mindfulnessStarted,
        mindfulnessCompleted,
        startMindfulness,
        completeMindfulness,
        endMindfulness,
      }}
    >
      {children}
    </MindfulnessContext.Provider>
  );
};
