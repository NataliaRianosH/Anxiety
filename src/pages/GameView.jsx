import React, { useState } from "react";
import GameMenu from "../components/GameMenu"; 
import { useAnxiety } from "../context/AnxietyContext";
import AnxietyChallenge from "../components/AnxietyChallenge";
import Game from "../components/Game";


const GameView = () => {
  
  const { anxietyAttack } = useAnxiety();

  return (
    <div className={`game-container ${anxietyAttack ? "blurred" : ""}`}  style={{ position: "relative", overflow: "hidden" }}>
      <GameMenu  />
      <Game />
      {anxietyAttack && <div className="anxiety-overlay"></div>}
      {anxietyAttack && <AnxietyChallenge onSuccess={() => {}} />}

    </div>
  );
};

export default GameView;
