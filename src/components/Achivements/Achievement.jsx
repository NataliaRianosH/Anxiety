import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";
import { useAchievements } from "../../context/AchievementsContext"; 
import { usePositiveThoughts } from "../../context/PositiveThoughtsContext";
import { useMindfulness } from "../../context/MindfulnessContext";


const Achievement = ({ id, position, geometry, collider, title, category }) => {
  const { positiveMessageValidated, startPositiveChallenge, endPositiveChallenge } = usePositiveThoughts();
  const { mindfulnessCompleted, startMindfulness, endMindfulness, phase, nextPhase } = useMindfulness(); // ✅ añadimos phase y nextPhase

  const { collectAchievement } = useAchievements();
  const [collected, setCollected] = useState(false);
  
  const isPositiveChallenge = category === "pensamientos";
  const isMindfulnessStarter = category === "iniciarMinfulness"; //esto quiere decir que es el logro que va a activar el minijuego sobre mindfulness

  
  useEffect(() => {
    
    console.log("Anxiety completed, osea si ya pasó/ganó el juego:", positiveMessageValidated);
    //si es un logro de categoria pensamientos  y el mensaje se validó (osea si completó el minijuego) y no se ha recogido
    if (isPositiveChallenge && positiveMessageValidated && !collected) { 
      console.log("Minijuego completado: recogiendo logro especial");
      setCollected(true); //se marcaacomo recogido
      collectAchievement(id);
      endPositiveChallenge();
    }
    //si es un logro de categoria iniciarMinfulness  y si completó el minijuego y no se ha recogido

    if (isMindfulnessStarter && mindfulnessCompleted && !collected) {
      console.log("Mindfulness completado: recogiendo logro especial");
      setCollected(true);
      collectAchievement(id);
      endMindfulness();
    }

  }, [
    positiveMessageValidated,
    isPositiveChallenge,
    collected,
    collectAchievement,
    id,
    mindfulnessCompleted,
    isMindfulnessStarter,
    endMindfulness
  ]);


  const handleCollision = () => {
    if (isPositiveChallenge) {
      console.log("Colisionaste con el logro especial: ", title);
      if (!positiveMessageValidated) {
        startPositiveChallenge();
      }
    } else if (isMindfulnessStarter) {
      console.log("Colisionaste con el logro de inicio de mindfulness: ", title);
      if (!mindfulnessCompleted) {
        startMindfulness();
      }
    } else if (category === "mindfulness") {
      // Fase 2: colisión con el reloj (id 4)
      if (id === 4 && phase === 2) {
        console.log("Reloj encontrado. Avanzando a la fase 3.");
        setCollected(true);
        collectAchievement(id);
        nextPhase();
        return;
      }

      // Fase 3: colisión con la paleta (id 5)
      if (id === 5 && phase === 3) {
        console.log("Paleta encontrada. Avanzando a la fase 4.");
        setCollected(true);
        collectAchievement(id);
        nextPhase();
        return;
      }

      // ✅ Fase 4: colisión con el perfume (id 6)
if (id === 6 && phase === 4) {
  console.log("Perfume encontrado. Avanzando a la fase 5.");
  setCollected(true);
  collectAchievement(id);
  nextPhase();
  return;
}
// ✅ Fase 5: colisión con el pastel (id 7)
// ✅ Fase 5: colisión con el pastel (id 7)
if (id === 7 && phase === 5) {
  console.log("Pastel encontrado. Completando minijuego.");
  setCollected(true);
  collectAchievement(id);
  completeMindfulness(); // marcar como ganado
  nextPhase(); // pasar a fase 6
  return;
}



      // Aquí se pueden controlar futuras fases
      console.log("Colisión con objeto mindfulness en fase no programada.");
    } else {
      console.log("Colisionaste un logro normal: ", title);
      setCollected(true);
      collectAchievement(id);
    }
  };
  

  if (collected) return null;

  return (
    <RigidBody
      colliders={collider}
      type="fixed"
      position={position}
      userData={{ isAchievement: true, id }}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "character") {
          handleCollision();
        }
      }}
    >
      <mesh>
        {geometry}
        <meshStandardMaterial color="gold" />
      </mesh>
    </RigidBody>
  );
};

export default Achievement;
