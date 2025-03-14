import React, { useState } from "react";
import GameMenu from "../components/GameMenu"; // Asegúrate de tener este componente
import Game from "./Game"; // Importa el juego

const GameView = () => {
  const [anxietyAttack, setAnxietyAttack] = useState(false);

  const triggerAnxiety = () => setAnxietyAttack(true);
  const stopAnxiety = () => setAnxietyAttack(false);

  return (
    <div className="game-container">
         <GameMenu onTriggerAnxiety={triggerAnxiety} onStopAnxiety={stopAnxiety} />
         <Game anxietyAttack={anxietyAttack} />
         {anxietyAttack && <div className="anxiety-overlay"></div>}
    </div>
  );
};

export default GameView;
