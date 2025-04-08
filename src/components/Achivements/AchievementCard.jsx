import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../../assets/styles/AchivementsCard.scss";
import logroImg from "../../assets/images/logro.png";


const AchievementCard = ({ achievement, onClick }) => {
  const { geometry, title, description, found } = achievement;
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`achievement-card ${found ? "found" : "not-found"}`} onClick={onClick}>

      {/*  Solo renderiza el modelo si está visible para optimizar el rendimiento */}
      <div className="image-placeholder">
        {isVisible ? (
     /* Esto era para mostrar el modelo del logro en 3D en lugar de la imagen 
        <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            {geometry}
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
      */
          <img src={logroImg} alt="Logro" className="achievement-image" />
        ) : (
          <p>Cargando...</p> // Alternativa visual cuando no se renderiza el modelo
        )}
      </div>

      {/* Título y descripción SIEMPRE visibles */}
      <h3 className={`${title} ${found ? "found-title" : "not-found-title"}`}>
  {title}
</h3>


    </div>
  );
};

export default AchievementCard;
