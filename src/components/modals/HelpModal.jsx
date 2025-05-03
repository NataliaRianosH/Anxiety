import React from "react";
import { X } from "lucide-react";
import ayudaTeclas from "../../assets/images/ControlesPrincipales.png";
import flechasTeclas from "../../assets/images/ControlesMovimiento.png";
import "../../assets/styles/modals/HelpModal.scss";

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="learning-modal-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("learning-modal-overlay")) {
          onClose();
        }
      }}
    >
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-scroll">
          <h2>Ayuda del juego</h2>

          <div className="help-section">
            <h3>1. ¿Qué es este juego?</h3>
            <p>
              Este es un entorno virtual relajante diseñado para ayudarte a entender y manejar la ansiedad. 
              Aquí podrás explorar a tu ritmo, sin presión, sin competencia y con actividades pensadas para el bienestar.
            </p>
            <img src={ayudaTeclas} alt="Controles W A S D" />
            <p>También puedes moverte con las teclas de dirección:</p>
            <img src={flechasTeclas} alt="Flechas dirección" />
          </div>

          <div className="help-section">
            <h3>2. ¿Cómo se juega?</h3>
            <p>
              Muévete usando las teclas W A S D o las flechas del teclado. 
              Si quieres avanzar más rápido, mantén presionada la tecla <strong>Shift</strong>. 
              Acércate a objetos o colisiónate con ellos para activar interacciones o minijuegos. No hay límites de tiempo.
            </p>
          </div>

          <div className="help-section">
            <h3>3. ¿Qué puedes hacer en el juego?</h3>
            <p>
              Puedes explorar escenarios naturales, encontrar elementos ocultos que enseñan a manejar la ansiedad,
              participar en minijuegos relajantes, y desbloquear logros que reflejan tu avance personal.
            </p>
          </div>

          <div className="help-section">
            <h3>4. ¿Cómo saber qué buscar?</h3>
            <p>
              Haz clic en el botón <strong>"Logros"</strong> para ver una lista de los objetos o actividades 
              que puedes descubrir. Puedes hacer clic en las tarjetas para observar los elementos más de cerca.
            </p>
          </div>

          <div className="help-section">
            <h3>5. ¿Y si no sé por dónde ir?</h3>
            <p>
              Este juego no tiene caminos correctos ni objetivos forzados. 
              Fue diseñado para que explores con calma y curiosidad. Cada rincón puede ofrecer una experiencia significativa.
            </p>
          </div>

          <div className="help-section">
            <h3>6. ¿Qué hace cada botón del menú?</h3>
            <p><strong>Volumen:</strong> Activa o silencia la música ambiental.</p>
            <p><strong>Ayuda:</strong> Abre esta ventana de instrucciones.</p>
            <p><strong>Menú:</strong> Te permite acceder a tu perfil, reiniciar la partida o cerrar sesión.</p>
          </div>
        </div>

        <button className="understood-btn" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};

export default HelpModal;
