import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import CharacterController from "../components/CharacterController";
import GameMenu from "../components/GameMenu";

const AnxietyEffect = ({ isActive }) => {
  const cameraRef = useRef();

  useFrame(({ camera }) => {
    if (isActive) {
      camera.position.x += (Math.random() - 0.5) * 0.1; // Sacudida
      camera.position.y += (Math.random() - 0.5) * 0.1;
    }
  });

  return null;
};

const GameWithAnxietyEffect = () => {
  const [isAnxietyActive, setIsAnxietyActive] = useState(false);

  const toggleAnxietyAttack = () => {
    setIsAnxietyActive(!isAnxietyActive);
  };

  return (
    <div
      className="game-container"
      style={{
        filter: isAnxietyActive ? "blur(5px)" : "none", // Aplica desenfoque
        transition: "filter 0.5s ease",
      }}
    >
      <button
        onClick={toggleAnxietyAttack}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 100 }}
      >
        {isAnxietyActive ? "Parar Ataque" : "Iniciar Ataque"}
      </button>
      <GameMenu /> {/* Mantiene el menú del juego */}
      <Canvas className="w-full h-screen">
        <Physics gravity={[0, -30, 0]}>
          <AnxietyEffect isActive={isAnxietyActive} />
          <CharacterController />
        </Physics>
      </Canvas>
    </div>
  );
};

export default GameWithAnxietyEffect;
