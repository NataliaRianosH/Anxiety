// src/context/PositiveThoughtsContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useMiniGameManager } from "./MiniGamesManagerContext";

// 1. Crear el contexto
const PositiveContext = createContext(); 

// 2. Hook para acceder desde cualquier componente
export const usePositiveThoughts = () => useContext(PositiveContext);

// 3. Provider con toda la lógica del minijuego
export const PositiveThoughtsProvider = ({ children }) => {
  const [positiveChallengeStarted, setPositiveChallengeStarted] = useState(false);
  const [positiveMessageValidated, setPositiveMessageValidated] = useState(false);
  const { activeGame, setActiveGame, isAnyMinigameActive } = useMiniGameManager();

  const audioRef = useRef(new Audio("/sounds/heartbeat.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true; 

    if (positiveChallengeStarted) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [positiveChallengeStarted]);

  // 5. Funciones para controlar el minijuego
  const startPositiveChallenge = () => {
    if (isAnyMinigameActive) {
      console.log(" No se puede iniciar el minijuego de pensamientos positivos porque ya hay otro activo.");
      return;
    }

    setPositiveChallengeStarted(true);
    setPositiveMessageValidated(false);
    setActiveGame("positive");
    console.log(" Minijuego de pensamientos positivos iniciado");
  };
  
  const endPositiveChallenge = () => {
  if (!positiveChallengeStarted) {
    console.log("No se puede terminar el minijuego de pensamientos positivos porque no ha sido iniciado.");
    return;
  }

  setPositiveChallengeStarted(false);
  setActiveGame(null);
  console.log(" Minijuego de pensamientos positivos terminado");
};
  const completePositiveChallenge = () => {
    setPositiveMessageValidated(true);
    console.log(" Minijuego completado");
  };


  return (
    <PositiveContext.Provider
      value={{
        positiveChallengeStarted,
        positiveMessageValidated,
        startPositiveChallenge,
        completePositiveChallenge,
        endPositiveChallenge,
      }}
    >
      {children}
    </PositiveContext.Provider>
  );
};
