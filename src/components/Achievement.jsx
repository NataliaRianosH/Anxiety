import { RigidBody } from "@react-three/rapier";
import { useState } from "react";

const Achievement = ({ position }) => {
  const [collected, setCollected] = useState(false);

  if (collected) return null; // Si ya se recogió, no lo renderiza

  return (
    <RigidBody
      colliders="cuboid"
      type="fixed"
      position={position}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "character") {
          console.log("El personaje tocó un logro");
          setCollected(true); // Hace que desaparezca
        }
      }}
    >
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="gold" />
      </mesh>
    </RigidBody>
  );
};

export default Achievement;
