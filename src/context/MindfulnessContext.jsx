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
  const { resetMindfulnessAchievements } = useAchievements(); 
  const { activeGame, setActiveGame, isAnyMinigameActive } =
    useMiniGameManager();
  const [phase, setPhase] = useState(1);

  // Función para iniciar el minijuego
  const startMindfulness = () => {
    if (isAnyMinigameActive) {
      console.log(
        "No se puede iniciar el minijuego de mindfulness porque ya hay otro activo."
      );
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
    console.log(" Minijuego mindfulness completado, ganaste");
  };

  // Función para salir del minijuego
  const endMindfulness = () => {
    if (!mindfulnessStarted) {
      console.log(
        "No se puede terminar el minijuego de mindfulness porque no ha sido iniciado."
      );
      return;
    }

    setMindfulnessStarted(false);
    setPhase(1); // Reiniciar fase al cancelar
    resetMindfulnessAchievements(); // Aquí limpiamos logros de la sesión
    setActiveGame(null);

    console.log("Minijuego mindfulness cancelado y reiniciado");
  };

  const nextPhase = () => {
    setPhase((prev) => (prev < 5 ? prev + 1 : prev));
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
      }}
    >
      {children}
    </MindfulnessContext.Provider>
  );
};
