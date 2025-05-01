import React, { useState } from "react"; // 
import { X } from "lucide-react";
import "../assets/styles/AnxietyChallenge.scss";
import { useMindfulness } from "../context/MindfulnessContext";

const MindfulnessChallenge = () => { 
  const {
    endMindfulness,
    phase,
    nextPhase,
    previousPhase,
    completeMindfulness
  } = useMindfulness();

  const [error, setError] = useState("");

  const handleCancel = () => {
    const confirmExit = window.confirm(
      "¿Seguro que deseas salir del minijuego?, no obtendrás ninguna recompensa."
    );
    if (confirmExit) {
      endMindfulness();
    }
  };

  const validarRespuestaFase1 = (respuesta) => {
    if (respuesta.toLowerCase() === "azul") {
      console.log("Fase 1 completada. Avanzando a la fase 2.");
      nextPhase();
    } else {
      setError("Respuesta incorrecta. Intenta de nuevo.");
    }
  };

  // Fase 6: mostrar solo el mensaje de finalización y botón


  return (
    <div className="anxiety-challenge">
      <div className="top-buttons">
        <button onClick={handleCancel} className="icon-btn">
          <X size={20} />
        </button>
      </div>

      {/* FASE 1 */}
      {phase === 1 && (
        <>
          <p>
            Estás en la <strong>Fase 1</strong>: Observa el entorno. No puedes
            moverte, solo girar. Encuentra el libro azul frente a ti.
          </p>

          <p>¿De qué color es el libro que observaste?</p>
          <div className="options-group">
            <button onClick={() => validarRespuestaFase1("rojo")}>Rojo</button>
            <button onClick={() => validarRespuestaFase1("azul")}>Azul</button>
            <button onClick={() => validarRespuestaFase1("verde")}>Verde</button>
          </div>
          {error && <p className="error">{error}</p>}
        </>
      )}

      {/* FASE 2 */}
      {phase === 2 && (
        <>
          <p>
            Estás en la <strong>Fase 2</strong>: Presta atención al sonido. Un objeto
            cercano hace <em>tictac</em>. Encuéntralo usando los controles (¡están invertidos!).
          </p>
          <p>
            Camina hasta el objeto (un reloj) y colisiónalo para completar esta fase.
          </p>
        </>
      )}

      {/* FASE 3 */}
      {phase === 3 && (
        <>
          <p>
            Estás en la <strong>Fase 3</strong>: Camina despacio. Tu avatar está sensible, sus movimientos reflejan un estado emocional bajo.
          </p>
          <p>
            Encuentra el objeto frío y dulce: una paleta. Al tocarla, avanzarás a la siguiente fase.
          </p>
        </>
      )}

      {/* FASE 4 */}
      {phase === 4 && (
        <>
          <p>
            Estás en la <strong>Fase 4</strong>: Respira profundamente. En algún lugar hay un aroma calmante que debes encontrar.
          </p>
          <p>
            Busca el frasco de perfume y camina hacia él para avanzar.
          </p>
        </>
      )}

      {/* FASE 5 */}
      {phase === 5 && (
        <>
          <p>
            Estás en la <strong>Fase 5</strong>: El sabor también calma. Busca el pastel.
          </p>
          <p>
            Al tocarlo, completarás el ejercicio. ¡Has llegado al final del minijuego!
          </p>
        </>
      )}

{phase === 6 && (
        <>
       
          <h2>¡Has completado el ejercicio de mindfulness!</h2>
          <p>
            Has utilizado todos tus sentidos para calmar tu mente. Respira, reconoce tu avance y llévate esta calma contigo.
          </p>
          <p>¡Felicitaciones por tu logro!</p>
         
          <button onClick={() => {
  completeMindfulness();  // Aquí sí se marca como completado
}}>
  Aceptar
</button>
        
        </>
      )}
        
  

      {/* Texto general para fases anterior
      {phase > 1 && (
        <>
          <p>
            Estás en la fase <strong>{phase}</strong> de 5 del ejercicio de
            mindfulness.
          </p>
        </>
      )}*/}

      

      {/* Siempre visibles para pruebas manuales */}
      <div className="phase-buttons">
        <button onClick={previousPhase} disabled={phase === 1}>
          Fase anterior
        </button>
        <button onClick={nextPhase} disabled={phase === 6}>
          Siguiente fase
        </button>
      </div>
    </div>
  );
};

export default MindfulnessChallenge;
