import React, { useState } from "react";
import GameMenu from "../components/GameMenu"; // Asegúrate de tener este componente
import Game from "./Game"; // Importa el juego
import { useAnxiety } from "../context/AnxietyContext";

const GameView = () => {
  

  const { anxietyAttack, startAnxietyAttack, endAnxietyAttack } = useAnxiety();


  return (
    <div className={`game-container ${anxietyAttack ? "blurred" : ""}`}>
      <GameMenu  />
      <Game />
      {anxietyAttack && <div className="anxiety-overlay"></div>}
    </div>
  );
};

export default GameView;
