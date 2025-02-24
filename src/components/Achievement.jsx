import { RigidBody } from "@react-three/rapier";
import { useState } from "react";

const Achievement = ({ id, position, geometry, collider, title, description  }) => {
  const [collected, setCollected] = useState(false);

  if (collected) return null; // Si ya se recogió, no lo renderiza

  return (
    <RigidBody
      colliders={ collider}
      type="fixed"
      position={position}
      userData={{ isAchievement: true, id }}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "character") {
          console.log(`El personaje recogió el logro #${id}: ${title}`);
          setCollected(true); // Hace que desaparezca
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
