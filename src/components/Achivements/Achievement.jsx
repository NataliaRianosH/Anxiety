import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";
import { useAchievements } from "../../context/AchievementsContext"; 
import { usePositiveThoughts } from "../../context/PositiveThoughtsContext";
import { useMindfulness } from "../../context/MindfulnessContext";


const Achievement = ({ id, position, geometry, collider, title, category }) => {
  const { positiveMessageValidated, startPositiveChallenge, endPositiveChallenge } = usePositiveThoughts();
  const{ mindfulnessCompleted, startMindfulness, endMindfulness } = useMindfulness();

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

  }, [positiveMessageValidated, isPositiveChallenge, collected, collectAchievement, id, mindfulnessCompleted, isMindfulnessStarter,endMindfulness ]);


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
