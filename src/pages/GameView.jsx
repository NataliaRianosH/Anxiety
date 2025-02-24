import React from "react";
import GameMenu from "../components/GameMenu"; // Asegúrate de tener este componente
import Game from "./Game"; // Importa el juego

const GameView = () => {
  return (
    <div className="game-container">
        <GameMenu />
     
      <Game />
    </div>
  );
};

export default GameView;
