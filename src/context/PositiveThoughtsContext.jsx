// src/context/PositiveThoughtsContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useMiniGameManager } from "./MiniGamesManagerContext";

// 1. Crear el contexto
const PositiveContext = createContext();

// 2. Hook para acceder desde cualquier componente
export const usePositiveThoughts = () => useContext(PositiveContext);

// 3. Provider con toda la lógica del minijuego
export const PositiveThoughtsProvider = ({ children }) => {
  const [positiveChallengeStarted, setPositiveChallengeStarted] =
    useState(false);
  const [positiveMessageValidated, setPositiveMessageValidated] =
    useState(false);
  const { activeGame, setActiveGame, isAnyMinigameActive } =
    useMiniGameManager();

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
      return;
    }
    setPositiveChallengeStarted(true);
    setPositiveMessageValidated(false);
    setActiveGame("positive");
  };

  const endPositiveChallenge = () => {
    if (!positiveChallengeStarted) {
      return;
    }
    setPositiveChallengeStarted(false);
    setActiveGame(null);
  };
  
  const completePositiveChallenge = () => {
    setPositiveMessageValidated(true);
  };
  const resetPositiveChallenge = () => {
    setPositiveChallengeStarted(false);
    setPositiveMessageValidated(false);
    setActiveGame(null);
  };

  return (
    <PositiveContext.Provider
      value={{
        positiveChallengeStarted,
        positiveMessageValidated,
        startPositiveChallenge,
        completePositiveChallenge,
        endPositiveChallenge,
        resetPositiveChallenge,
      }}
    >
      {children}
    </PositiveContext.Provider>
  );
};
