import React, { useState } from "react";
import { X, HelpCircle, Bot } from "lucide-react";
import "./../assets/styles/AnxietyChallenge.scss";
import { useAnxiety } from "../context/AnxietyContext";
import HelpModal from "./modals/HelpModal";

const AnxietyChallenge = ({ onSuccess, onCancel }) => {
  const { endAnxietyAttack } = useAnxiety();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false); // futuro uso
  const [showHelp, setShowHelp] = useState(false);
  const { completeAnxietyChallenge } = useAnxiety();

  const handleSubmit = () => {
    const mensaje = input.trim();

    const soloLetrasYEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetrasYEspacios.test(mensaje)) {
      setError("Solo puedes escribir letras y espacios.");
      return;
    }

    const palabras = mensaje.split(/\s+/).filter((p) => p.length > 1);
    if (palabras.length < 3) {
      setError("Escribe al menos tres palabras.");
      return;
    }

    const repetidas = new Set(palabras.map((p) => p.toLowerCase()));
    if (repetidas.size / palabras.length < 0.5) {
      setError("Evita repetir muchas veces las mismas palabras.");
      return;
    }

    const malas = ["feo", "malo", "tonto", "estúpido", "odio"];
    if (palabras.some((p) => malas.includes(p.toLowerCase()))) {
      setError("No uses palabras negativas u ofensivas.");
      return;
    }

    setCompleted(true);
    completeAnxietyChallenge(); 
    onSuccess();
  };

  const handleCancel = () => {
    const confirmExit = window.confirm(
      "¿Seguro que deseas salir del minijuego?, no obtendrás ninguna recompensa."
    );
    if (confirmExit) {
      endAnxietyAttack(); // Termina el ataque
    }
  };

  return (
    <div className="anxiety-challenge">
      <div className="top-buttons">
        <button onClick={handleCancel} className="icon-btn">
          <X size={20} />
        </button>

        <button className="icon-btn" onClick={() => setShowHelp(true)}>
          <HelpCircle size={20} />
        </button>

        <button className="icon-btn" disabled>
          <Bot size={20} />
        </button>
      </div>

      {!completed ? (
        <>
          <p>
            Estás atravesando un momento de ansiedad. Respira hondo y escribe un
            mensaje positivo para tu avatar.
          </p>
          <div className="input-wrapper">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje positivo..."
            />
            <button onClick={handleSubmit}>Enviar</button>
          </div>
          {error && <p className="error">{error}</p>}
        </>
      ) : (
        <p className="success">
          ¡Buen trabajo! Has escrito un mensaje positivo.
        </p>
      )}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default AnxietyChallenge;
