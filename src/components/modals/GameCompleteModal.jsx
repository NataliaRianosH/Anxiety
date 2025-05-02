import React from "react";
import "../../assets/styles/modals/GameCompleteModal.scss";

const GameCompleteModal = ({ onClose }) => {
  return (
    <div className="game-complete-modal">
      <div className="modal-content">
        <h2>¡Felicidades!</h2>
        <p>
          Has encontrado todos los logros disponibles en este mundo.<br />
          Te preparas para lo que viene...<br />
          pero por ahora, continúa explorando a tu ritmo.
        </p>
        <button className="close-button" onClick={onClose}>
          Continuar explorando
        </button>
      </div>
    </div>
  );
};

export default GameCompleteModal;
