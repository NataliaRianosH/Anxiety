// src/components/modals/LearningModal.jsx
import React from "react";
import "../../assets/styles/modals/LearningModal.scss";
import { X, Brain } from "lucide-react";

const LearningModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const { title, subtitle, sections, highlight } = data;

  return (
    <div className="learning-modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-scroll">
          <h2>{title}</h2>
          {subtitle && <p className="subtitle">"{subtitle}"</p>}

          {sections?.map((section, index) => (
            <div key={index}>
              <h3>{section.heading}</h3>
              <p>{section.text}</p>
            </div>
          ))}

          {highlight && <div className="highlight">{highlight}</div>}
        </div>

        <button className="understood-btn" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};


export default LearningModal;
