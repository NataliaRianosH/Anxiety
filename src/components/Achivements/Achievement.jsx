import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";
import { useAchievements } from "../../context/AchievementsContext"; 
import { usePositiveThoughts } from "../../context/PositiveThoughtsContext";


const Achievement = ({ id, position, geometry, collider, title, category }) => {
  const { positiveMessageValidated, startPositiveChallenge, endPositiveChallenge } = usePositiveThoughts();
  const { collectAchievement } = useAchievements();
  const [collected, setCollected] = useState(false);
  
  const isPositiveChallenge = category === "pensamientos";
  
  useEffect(() => {
    console.log("Anxiety completed, osea si ya pasó/ganó el juego:", positiveMessageValidated);
    //si es un logro especial y el mensaje se validó y no se ha recogido
    if (isPositiveChallenge && positiveMessageValidated && !collected) { 
      console.log("Minijuego completado: recogiendo logro especial");
      setCollected(true); //se marca como recogido
      collectAchievement(id);
      endPositiveChallenge();
    }
  }, [positiveMessageValidated, isPositiveChallenge, collected, collectAchievement, id]);


  const handleCollision = () => {
    if (isPositiveChallenge) {
      console.log("Colisionaste con el logro especial: ", title);
      
      if (!positiveMessageValidated) {
        startPositiveChallenge();
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
