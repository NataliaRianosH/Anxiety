import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Avatar1 } from "../models/Avatars/Avatar1";
import { Avatar2 } from "../models/Avatars/Avatar2";
import { Avatar3 } from "../models/Avatars/Avatar3";

const AvatarView = ({ avatarSkin, onAvatarChange }) => {
  const avatarRef = useRef();
  const [rotationY, setRotationY] = useState(0);

  const [animation, setAnimation] = useState( "Idle");

  const avatarOptions = ["Avatar1", "Avatar2", "Avatar3"];

  // buscamos el índice del avatar actual del usuario
  const initialIndex = avatarOptions.indexOf(avatarSkin);
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex !== -1 ? initialIndex : 0
  );

  const isDragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    // console.log(animation);

    console.log("el avatar del jugador es", avatarSkin);
    console.log(currentIndex);
    if (onAvatarChange) {
      onAvatarChange(avatarOptions[currentIndex]);
    }
  }, [currentIndex]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX; // Guardar la posición inicial
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return; // Si no está arrastrando, no hace nada

    const deltaX = e.clientX - lastX.current; // Diferencia entre la posición anterior y la nueva
    lastX.current = e.clientX; // Actualizar la última posición del cursor

    setRotationY((prev) => prev + deltaX * 0.01); // Sumar el cambio al ángulo de rotación
  };

  //el error q se provoca en las animaciones se resuelve cuando los modelos tengan las animaciones correspondfientes
  const handleClick = () => {
    console.log("Avatar clicked", avatarSkin);
      setAnimation("Jumping");
 

    setTimeout(
      () => {
    
        setAnimation( "Idle");
      },
       2000 
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % avatarOptions.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + avatarOptions.length) % avatarOptions.length
    );
  };

  return (
    <div
      className="avatar-placeholder"
      onDoubleClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Flechas laterales */}
      <button className="arrow-button left" onClick={handlePrev}>
        ←
      </button>
      <button className="arrow-button right" onClick={handleNext}>
        →
      </button>

      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 10, 0]} angle={0.15} intensity={1} />

        <group ref={avatarRef}>
          {avatarOptions[currentIndex] === "Avatar1" && (
            <Avatar1
              animation={animation}
              scale={3}
              position={[0, -2.6, -3.5]}
              rotation={[0.2, rotationY, 0]}
            />
          )}
          {avatarOptions[currentIndex] === "Avatar2" && (
            <Avatar2
              scale={3}
              animation={animation}
              position={[0, -2.6, -3.5]}
              rotation={[0.2, rotationY, 0]}
            />
          )}
          {avatarOptions[currentIndex] === "Avatar3" && (
            <Avatar3
              scale={3}
              animation={animation}
              position={[0, -2.6, -3.5]}
              rotation={[0.2, rotationY, 0]}
            />
          )}
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default AvatarView;
