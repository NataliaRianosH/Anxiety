import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../../assets/styles/AchievementDetails.scss";

const AchievementDetails = ({ achievement, onBack }) => {
  if (!achievement) return null;

  return (
    <div className="achievement-details">
      <h3>{achievement.title}</h3>

      {/* Canvas para mostrar el modelo 3D del logro */}
      <div className="achievement-model">
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[0, 10, 0]} angle={0.15} intensity={1} />
          {achievement.geometry} 
          <OrbitControls enableZoom={true} enablePan={false} />
        </Canvas>
      </div>

      <p>{achievement.description}</p>
      <button className="back-button" onClick={onBack}>Volver</button>
    </div>
  );
};

export default AchievementDetails;
