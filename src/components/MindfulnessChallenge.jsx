import React from "react";
import { X } from "lucide-react";
import "../assets/styles/AnxietyChallenge.scss";
import { useMindfulness } from "../context/MindfulnessContext";

const MindfulnessChallenge = () => {
  const {
    endMindfulness,
    phase,
    nextPhase,
    previousPhase,
  } = useMindfulness();

  const handleCancel = () => {
    const confirmExit = window.confirm(
      "¿Seguro que deseas salir del minijuego?, no obtendrás ninguna recompensa."
    );
    if (confirmExit) {
      endMindfulness();
    }
  };

  return (
    <div className="anxiety-challenge">
      <div className="top-buttons">
        <button onClick={handleCancel} className="icon-btn">
          <X size={20} />
        </button>
      </div>

      <p>
        Estás en la fase <strong>{phase}</strong> de 5 del ejercicio de mindfulness.
      </p>

      <div className="phase-buttons">
        <button onClick={previousPhase} disabled={phase === 1}>
          Fase anterior
        </button>
        <button onClick={nextPhase} disabled={phase === 5}>
          Siguiente fase
        </button>
      </div>
    </div>
  );
};

export default MindfulnessChallenge;
