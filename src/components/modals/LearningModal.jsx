// src/components/modals/LearningModal.jsx
import React from "react";
import "../../assets/styles/modals/LearningModal.scss";
import { X, Brain } from "lucide-react";

const LearningModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="learning-modal-overlay">
    <div className="modal-content">
      <button className="close-btn" onClick={onClose}>
        <X size={20} />
      </button>
  
      <div className="modal-scroll">
      <h2>¿Qué es la ansiedad?</h2>
        <p className="subtitle">
          "Una alarma útil que a veces se activa sin razón"
        </p>

        <h3>¿Por qué existe la ansiedad?</h3>
        <p>
          La ansiedad es una respuesta natural del cuerpo ante situaciones de
          peligro. Es como una alarma interna que nos mantiene alertas y nos
          ayuda a sobrevivir.
        </p>

        <h3>¿Cuándo se vuelve un problema?</h3>
        <p>
          Cuando esta alarma suena sin motivo real, puede generarnos angustia
          constante. Esto sucede cuando el cerebro interpreta situaciones
          normales como si fueran amenazas.
        </p>

        <h3>¿Qué pasa en el cerebro?</h3>
        <p>
          Se activa una parte llamada <strong>amígdala</strong>, que genera
          sensaciones intensas de alerta. Aunque parezca peligroso, en
          realidad solo es una señal de que necesitas calma.
        </p>

        <div className="highlight">
          💡 <strong>Recuerda:</strong> Sentir ansiedad no te hace débil. Es
          una señal de que tu cuerpo está intentando ayudarte.
        </div>
      </div>
  
      <button className="understood-btn" onClick={onClose}>Entendido</button>
    </div>
  </div>
  
  );

};

export default LearningModal;
