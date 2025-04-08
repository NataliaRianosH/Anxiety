import React, { useState } from "react";
import GameMenu from "../components/GameMenu"; 
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";
import Game from "../components/Game";
import PositiveChallenge from "../components/PositiveChallenge";


const GameView = () => {
  
  const {positiveChallengeStarted, endPositiveChallenge } = usePositiveThoughts();

  return (
    <div className={`game-container ${        positiveChallengeStarted  ? "blurred" : ""}`}  style={{ position: "relative", overflow: "hidden" }}>
      <GameMenu  />
      <Game />
      {positiveChallengeStarted && <div className="anxiety-overlay"></div>}
      {positiveChallengeStarted && <PositiveChallenge onSuccess={() => {endPositiveChallenge()}} />}

    </div>
  );
};

export default GameView;
