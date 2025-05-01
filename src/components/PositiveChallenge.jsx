import React, { useState } from "react";
import { X, HelpCircle, Bot } from "lucide-react";
import "./../assets/styles/AnxietyChallenge.scss";
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";

import HelpModal from "./modals/HelpModal";
import { evaluateMessage } from "../utils/evaluateMessage";

const PositiveChallenge = ({ onSuccess, onCancel }) => {
  const { endPositiveChallenge, completePositiveChallenge } =
    usePositiveThoughts();

  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    const mensaje = input.trim();
    const soloLetrasYEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetrasYEspacios.test(mensaje)) {
      return "Solo puedes escribir letras y espacios.";
    }
    const palabras = mensaje.split(/\s+/).filter((p) => p.length > 1);
    if (palabras.length < 3) {
      return "Escribe al menos tres palabras.";
    }
    const repetidas = new Set(palabras.map((p) => p.toLowerCase()));
    if (repetidas.size / palabras.length < 0.5) {
      return "Evita repetir muchas veces las mismas palabras.";
    }
    const malas = ["feo", "malo", "tonto", "estúpido", "odio"];
    if (palabras.some((p) => malas.includes(p.toLowerCase()))) {
      return "No uses palabras negativas u ofensivas.";
    }
    return "";
  };

  const handleSubmit = async () => {
    setError("");

    const basicValidation = validateInput();
    if (basicValidation) {
      setError(basicValidation);
      return;
    }

    if (aiEnabled) {
      console.log("Evaluando mensaje con IA...");
      try {
        setLoading(true);
        const respuestaIA = await evaluateMessage(input.trim());
        console.log("IA dice:", respuestaIA);
        if (respuestaIA.toLowerCase().includes("sí")) {
          setCompleted(true);
          completePositiveChallenge();
          onSuccess();
        } else {
          setError(respuestaIA);
        }
      } catch (err) {
        setError("Hubo un error al evaluar con la IA.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Evaluación normal sin IA.");
      setCompleted(true);
      completePositiveChallenge();
      onSuccess();
    }
  };

  const handleCancel = () => {
    const confirmExit = window.confirm(
      "¿Seguro que deseas salir del minijuego?, no obtendrás ninguna recompensa."
    );
    if (confirmExit) {
      endPositiveChallenge();
    }
  };

  return (
    <div className="anxiety-challenge">
      <div className="top-buttons">
        

        <button className="icon-btn" onClick={() => setShowHelp(true)}>
          <HelpCircle size={20} />
        </button>

        <button
          className={`icon-btn bot-toggle ${aiEnabled ? "active" : ""}`}
          onClick={() => setAiEnabled(!aiEnabled)}
          title="Evaluar con IA"
        >
          <Bot size={20} />
        </button>

        <button onClick={handleCancel} className="icon-btn">
          <X size={20} />
        </button>
      </div>

      {!completed ? (
  <div className="mindfulness-phase">
    <div className="mindfulness-header">
      <div className="mindfulness-title">
        <strong>Mensaje Positivo</strong>
      </div>
    </div>

    <div className="mindfulness-description">
      <p className="main-text">
        Estás atravesando un momento de ansiedad. Respira hondo y escribe un mensaje positivo para tu avatar.
      </p>
      <p className="secondary-text">
        Este mensaje te ayudará a enfrentar situaciones difíciles en el futuro.
      </p>
    </div>

    <div className="input-wrapper">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje positivo..."
        disabled={loading}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Evaluando..." : "Enviar"}
      </button>
    </div>

    {error && <p className="error">{error}</p>}
  </div>
) : (
  <p className="success">¡Buen trabajo! Has escrito un mensaje positivo.</p>
)}


      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default PositiveChallenge;
