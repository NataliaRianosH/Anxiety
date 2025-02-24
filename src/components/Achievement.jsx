import { RigidBody } from "@react-three/rapier";
import { useState } from "react";

const Achievement = ({ id, position, shape = "box" }) => {
  const [collected, setCollected] = useState(false);

  if (collected) return null; // Si ya se recogió, no lo renderiza

  return (
    <RigidBody
      colliders={shape === "box" ? "cuboid" : "ball"}
      type="fixed"
      position={position}
      userData={{ isAchievement: true, id }}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "character") {
          console.log(`El personaje recogió el logro #${id}`);
          setCollected(true); // Hace que desaparezca
        }
      }}
    >
      <mesh>
        {shape === "box" ? (
          <boxGeometry args={[2, 2, 2]} />
        ) : (
          <sphereGeometry args={[1, 32, 32]} />
        )}
        <meshStandardMaterial color="gold" />
      </mesh>
    </RigidBody>
  );
};

export default Achievement;
