
const MindfulnessChallenge = ({ onExit }) => {
    return (
      <div className="anxiety-challenge">
        <p>Estás en un momento de ansiedad. Vamos a practicar mindfulness.</p>
        <p>(Aquí se mostrará el minijuego con las 5 etapas... próximamente)</p>
        <button onClick={onExit}>Salir del minijuego</button>
      </div>
    );
  };
  
  export default MindfulnessChallenge;
  