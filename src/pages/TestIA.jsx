import { useState, useEffect } from "react";
import { evaluateMessage } from "../utils/evaluateMessage";

const TestIA = () => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const mensaje = input.trim();
  
    if (mensaje.length === 0) {
      setError("");
      setIsValid(false);
      return;
    }
  
    // Letras, números, acentos, ñ, espacios
    const letrasNumerosYEspacios = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!letrasNumerosYEspacios.test(mensaje)) {
      setError("Solo puedes escribir letras, números y espacios. No se permiten símbolos.");
      setIsValid(false);
      return;
    }
  
    const palabras = mensaje.split(/\s+/).filter(p => p.length > 1);
    if (palabras.length < 3) {
      setError("Escribe al menos tres palabras con sentido.");
      setIsValid(false);
      return;
    }
  
    // Evitar repetición excesiva
    const total = palabras.length;
    const unicas = new Set(palabras.map(p => p.toLowerCase()));
    if (unicas.size / total < 0.5) {
      setError("Evita repetir muchas veces las mismas palabras.");
      setIsValid(false);
      return;
    }
  
    // Lista básica de palabras negativas
    const malas = ["feo", "malo", "tonto", "estúpido", "odio"];
    const contienePalabraMala = palabras.some(p =>
      malas.includes(p.toLowerCase())
    );
    if (contienePalabraMala) {
      setError("Evita usar palabras negativas u ofensivas.");
      setIsValid(false);
      return;
    }
  
    setError("");
    setIsValid(true);
  }, [input]);
  
  
  

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await evaluateMessage(input.trim());
      setFeedback(result);
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Evaluador de Mensajes Positivos</h2>

      <textarea
        rows="4"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje positivo aquí"
        style={{
          borderColor: error ? "red" : "#ccc",
          outline: "none",
          padding: "8px",
          fontSize: "16px",
        }}
      />
      <br />
      {error && (
        <p style={{ color: "red", marginTop: 5 }}>{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!isValid || loading}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          backgroundColor: isValid ? "#007bff" : "#ccc",
          color: "#fff",
          border: "none",
          cursor: isValid ? "pointer" : "not-allowed",
        }}
      >
        {loading ? "Evaluando..." : "Evaluar"}
      </button>

      <div style={{ marginTop: 20 }}>
        <strong>Resultado:</strong> {feedback}
      </div>
    </div>
  );
};

export default TestIA;
