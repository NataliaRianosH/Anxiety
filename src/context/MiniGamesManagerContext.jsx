import { createContext, useContext, useState } from "react";

const MiniGamesContext = createContext();

export const useMiniGameManager = () => useContext(MiniGamesContext);

export const MiniGamesManagerProvider = ({ children }) => {
  const [activeGame, setActiveGame] = useState(null); // 'positive', 'mindfulness', o null

  const isAnyMinigameActive = !!activeGame;

  return (
    <MiniGamesContext.Provider value={{ activeGame, setActiveGame, isAnyMinigameActive }}>
      {children}
    </MiniGamesContext.Provider>
  );
};
