import React, { useState } from "react";
import "./../assets/styles/AnxietyChallenge.scss";  

const AnxietyChallenge = ({ onSuccess }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    const mensaje = input.trim();

    const soloLetrasYEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetrasYEspacios.test(mensaje)) {
      setError("Solo puedes escribir letras y espacios.");
      return;
    }

    const palabras = mensaje.split(/\s+/).filter(p => p.length > 1);
    if (palabras.length < 3) {
      setError("Escribe al menos tres palabras.");
      return;
    }

    const repetidas = new Set(palabras.map(p => p.toLowerCase()));
    if (repetidas.size / palabras.length < 0.5) {
      setError("Evita repetir muchas veces las mismas palabras.");
      return;
    }

    const malas = ["feo", "malo", "tonto", "estúpido", "odio"];
    const contieneMala = palabras.some(p => malas.includes(p.toLowerCase()));
    if (contieneMala) {
      setError("No uses palabras negativas u ofensivas.");
      return;
    }

    setCompleted(true);
    onSuccess(); // Aquí luego marcarás el logro como completado
  };

  return (
    <div className="anxiety-challenge">
      {!completed ? (
        <>
          <p>
            Estás atravesando un momento de ansiedad. Respira hondo y escribe un
            mensaje positivo para tu avatar.
          </p>
          <div className="input-wrapper"> {/* ¡Este contenedor es CLAVE! */}
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
        <p className="success">¡Buen trabajo! Has logrado calmarte con un mensaje positivo.</p>
      )}
    </div>
  );
  
};

export default AnxietyChallenge;
