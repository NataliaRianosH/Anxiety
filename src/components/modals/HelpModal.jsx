import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./../../assets/styles/modals/HelpModal.scss";
import { ArrowRight, ArrowLeft } from "lucide-react";


const HelpModal = ({ onClose }) => {
  const { user } = useAuth();
  const avatarName = user?.avatar_name || "Avatar";
  const [page, setPage] = useState(0);

  return (
    <div className="help-modal-overlay">
      <div className="help-modal">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {page === 0 && (
          <>
            <h2>¿Cómo funciona este minijuego?</h2>
            <p>
              En este minijuego, estás ayudando a tu compañero <strong>{avatarName}</strong> a calmarse durante un ataque de ansiedad.
              Para hacerlo, debes escribir un mensaje positivo que lo anime y lo ayude a tranquilizarse.
            </p>
            <ul>
              <li>Debe tener al menos 3 palabras.</li>
              <li>No puede contener palabras negativas u ofensivas.</li>
              <li>No repitas las mismas palabras muchas veces.</li>
            </ul>
            <p>
              Si decides cerrar el minijuego ahora, <strong>no obtendrás el logro asociado</strong>. Puedes retomarlo después.
              Pronto podrás usar inteligencia artificial para recibir retroalimentación sobre tu mensaje.
            </p>
          </>
        )}

        {page === 1 && (
          <>
            <h2>¿Por qué este minijuego?</h2>
            <p>
              Muchas personas experimentan pensamientos negativos y ansiedad. Este minijuego busca ayudarte a reconocer esos momentos
              y a practicar técnicas de autoafirmación que pueden ser útiles en la vida real.
            </p>
            <p>
              Al escribir mensajes positivos para tu avatar, estás desarrollando empatía, calma y enfoque, elementos clave para manejar la ansiedad.
              Este ejercicio se basa en herramientas de psicología cognitiva y técnicas de mindfulness.
            </p>
          </>
        )}

        <div className="modal-footer">
          {page > 0 && (
            <button onClick={() => setPage(page - 1)} className="icon-btn">
              <ArrowLeft size={20} />
            </button>
          )}
          {page < 1 && (
            <button onClick={() => setPage(page + 1)} className="icon-btn">
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
