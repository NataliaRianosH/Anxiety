import React, { useState } from "react";
import GameMenu from "../components/GameMenu"; 
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";
import Game from "../components/Game";
import PositiveChallenge from "../components/PositiveChallenge";
import { useMindfulness } from "../context/MindfulnessContext";


const GameView = () => {
  
  const {positiveChallengeStarted, endPositiveChallenge } = usePositiveThoughts();
  const { mindfulnessStarted, endMindfulness } = useMindfulness();
  return (
    <div className={`game-container ${positiveChallengeStarted || mindfulnessStarted  ? "blurred" : ""}`}  style={{ position: "relative", overflow: "hidden" }}>
      <GameMenu  />
      <Game/>
      {(positiveChallengeStarted || mindfulnessStarted) && <div className="anxiety-overlay"></div>}
      {positiveChallengeStarted && <PositiveChallenge onSuccess={() => {endPositiveChallenge()}} />}

    </div>
  );
};

export default GameView;
