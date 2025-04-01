import { RigidBody } from "@react-three/rapier";
import { useState } from "react";
import { useAchievements } from "../context/AchievementsContext"; //  Importamos el contexto

const Achievement = ({ id, position, geometry, collider, title }) => {
  const { collectAchievement } = useAchievements(); // Obtenemos la función del contexto
  const [collected, setCollected] = useState(false);

  if (collected) return null;

  return (
    <RigidBody
      colliders={collider}
      type="fixed"
      position={position}
      userData={{ isAchievement: true, id }}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "character") {
          console.log(` Logro recogido: ${title}`);
          setCollected(true);
          collectAchievement(id); 
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
