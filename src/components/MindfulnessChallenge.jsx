import React, { useState } from "react"; //
import { X } from "lucide-react";
import "../assets/styles/AnxietyChallenge.scss";
import { useMindfulness } from "../context/MindfulnessContext";
import { useAchievements } from "../context/AchievementsContext";

const MindfulnessChallenge = () => {
  const {
    endMindfulness,
    phase,
    nextPhase,
    previousPhase,
    completeMindfulness,
  } = useMindfulness();

  const [error, setError] = useState("");
  const { collectAchievement } = useAchievements();

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
      collectAchievement(3);
      nextPhase();
    } else {
      setError("Respuesta incorrecta. Intenta de nuevo.");
    }
  };

  // Fase 6: mostrar solo el mensaje de finalización y botón

  return (
    <div className="anxiety-challenge">
      <div className="challenge-content">
        <div className="top-buttons">
          <button onClick={handleCancel} className="icon-btn">
            <X size={20} />
          </button>
        </div>

        {/* FASE 1 */}
        {phase === 1 && (
          <>
            {phase === 1 && (
              <div className="mindfulness-phase">
                <div className="mindfulness-header">
                  <div className="mindfulness-title">
                    <strong>Fase 1</strong>
                    <span className="mindfulness-step">1/5</span>
                  </div>
                  <div className="mindfulness-subtitle">Observación</div>
                </div>

                <div className="mindfulness-description">
                  <p className="main-text">
                    Observa el entorno. No puedes moverte, solo girar.
                  </p>
                  <p className="secondary-text">
                    Encuentra el libro mirando a tu alrededor. ¿de qué color
                    es?.
                  </p>
                </div>

                <div className="mindfulness-options">
                  <p
                    className="option"
                    onClick={() => validarRespuestaFase1("rojo")}
                  >
                    a. Rojo
                  </p>
                  <p
                    className="option"
                    onClick={() => validarRespuestaFase1("azul")}
                  >
                    b. Azul
                  </p>
                  <p
                    className="option"
                    onClick={() => validarRespuestaFase1("verde")}
                  >
                    c. Verde
                  </p>
                  <p
                    className="option"
                    onClick={() => validarRespuestaFase1("no encontrado")}
                  >
                    d. No lo encontré
                  </p>
                </div>

                {error && <p className="error">{error}</p>}
              </div>
            )}
          </>
        )}

        {/* FASE 2 */}
        {phase === 2 && (
          <div className="mindfulness-phase">
            <div className="mindfulness-header">
              <div className="mindfulness-title">
                <strong>Fase 2</strong>
                <span className="mindfulness-step">2/5</span>
              </div>
              <div className="mindfulness-subtitle">Atención Auditiva</div>
            </div>

            <div className="mindfulness-description">
              <p className="main-text">
                Presta atención al sonido. Un objeto cercano hace tic-tac.
              </p>
              <p className="secondary-text">
                Camina hasta el objeto (un reloj) y colisiónalo para completar
                esta fase.
              </p>
            </div>
          </div>
        )}

        {phase === 3 && (
          <div className="mindfulness-phase">
            <div className="mindfulness-header">
              <div className="mindfulness-title">
                <strong>Fase 3</strong>
                <span className="mindfulness-step">3/5</span>
              </div>
              <div className="mindfulness-subtitle">Movimiento Consciente</div>
            </div>

            <div className="mindfulness-description">
              <p className="main-text">
                Camina despacio. Tu avatar está sensible, sus movimientos
                reflejan un estado emocional bajo.
              </p>
              <p className="secondary-text">
                Encuentra el objeto frío y dulce: una paleta. Al tocarla,
                avanzarás a la siguiente fase.
              </p>
            </div>
          </div>
        )}

        {phase === 4 && (
          <div className="mindfulness-phase">
            <div className="mindfulness-header">
              <div className="mindfulness-title">
                <strong>Fase 4</strong>
                <span className="mindfulness-step">4/5</span>
              </div>
              <div className="mindfulness-subtitle">Respiración Profunda</div>
            </div>

            <div className="mindfulness-description">
              <p className="main-text">
                Respira profundamente. En algún lugar hay un aroma calmante que
                debes encontrar.
              </p>
              <p className="secondary-text">
                Busca el frasco de perfume y camina hacia él para avanzar.
              </p>
            </div>
          </div>
        )}

        {phase === 5 && (
          <div className="mindfulness-phase">
            <div className="mindfulness-header">
              <div className="mindfulness-title">
                <strong>Fase 5</strong>
                <span className="mindfulness-step">5/5</span>
              </div>
              <div className="mindfulness-subtitle">Sabor Consciente</div>
            </div>

            <div className="mindfulness-description">
              <p className="main-text">
                El sabor también calma. Busca el pastel.
              </p>
              <p className="secondary-text">
                Al tocarlo, completarás el ejercicio. ¡Has llegado al final del
                minijuego!
              </p>
            </div>
          </div>
        )}

{phase === 6 && (
  <div className="phase-end">
    <h2 className="phase-end-title">Técnicas que puedes usar siempre</h2>
    <p className="phase-end-description">
      Cuando sientas que la ansiedad aparece, recuerda este minijuego.
    </p>
    <p className="phase-end-description">
      Centrarte en lo que puedes percibir con tu cuerpo es una forma poderosa de volver al presente.
    </p>
    <p className="phase-end-description">
      Usa esta estrategia como una herramienta de autocuidado.
    </p>
    <button className="phase-end-btn" onClick={completeMindfulness}>Aceptar</button>
  </div>
)}


        {/* Siempre visibles para pruebas manuales 
        <div className="phase-buttons">
          <button onClick={previousPhase} disabled={phase === 1}>
            Fase anterior
          </button>
          <button onClick={nextPhase} disabled={phase === 6}>
            Siguiente fase
          </button>
        </div>*/}

        <div className="mindfulness-progress-bar">
          <div
            className="mindfulness-progress-fill"
            style={{ width: `${(phase / 5) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MindfulnessChallenge;
