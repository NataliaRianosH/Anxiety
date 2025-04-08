import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";
import { useAchievements } from "../../context/AchievementsContext"; 
import { useAnxiety } from "../../context/AnxietyContext";

const Achievement = ({ id, position, geometry, collider, title }) => {
  const { anxietyCompleted, startAnxietyAttack, endAnxietyAttack } = useAnxiety();
  const { collectAchievement } = useAchievements();
  const [collected, setCollected] = useState(false);
  
  const isSpecial = title === "Pensamientos positivos";

  useEffect(() => {
    console.log("Anxiety completed:", anxietyCompleted);
    if (isSpecial && anxietyCompleted && !collected) {
      console.log("Minijuego completado: recogiendo logro especial");
      setCollected(true);
      collectAchievement(id);
      endAnxietyAttack();
    }
  }, [anxietyCompleted, isSpecial, collected, collectAchievement, id]);


  const handleCollision = () => {
    if (isSpecial) {
      console.log("Colisionaste con el logro especial: ", title);
      
      if (!anxietyCompleted) {
         startAnxietyAttack();
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
