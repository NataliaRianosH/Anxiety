import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Flowerpot from "../models/Flowerpot";
import "../assets/styles/AchivementsCard.scss";

const AchievementCard = () => {
  return (
    <div className="achievement-card">
      {/* Espacio para renderizar el objeto 3D */}
      <div className="image-placeholder">
        <Canvas camera={{ position: [0, 0, 150], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Flowerpot scale={150} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Título y descripción */}
      <h3 className="title">Título</h3>
      <p className="description">Aquí iría la descripción del título</p>
    </div>
  );
};

export default AchievementCard;
