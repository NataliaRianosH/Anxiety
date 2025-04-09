import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";
import Island from "../models/Island";
import { Environment, OrbitControls } from "@react-three/drei";
import Sky from "../models/Sky";
import Grass from "../models/Grass";
import { Physics, RigidBody } from "@react-three/rapier";
import CharacterController from "./CharacterController";
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";
import Achievement from "./Achivements/Achievement";
import achievementsData from "./Achivements/AchivementsData";
import { useMindfulness } from "../context/MindfulnessContext";
import Popsicle from "../models/Popsicle";
import Clock from "../models/Clock";
import { useAchievements } from "../context/AchievementsContext";

const Game = () => {
  const { positiveChallengeStarted } = usePositiveThoughts();
  const { mindfulnessStarted } = useMindfulness();
  const { achievements } = useAchievements();

  //Se puede añadir el rigidbody con su collider directamente en el modelo, pero por ahora para las geometrias se pasa

  {
    /** const achievementsData = [
    { id: 1, position: [11, 11, 25], shape: "box" },
    { id: 2, position: [-3, 7, 48], shape: "sphere" },
    { id: 3, position: [27, 6, 35], shape: "box" },
    { id: 4, position: [-38.4, 6, 31.8], shape: "sphere" },
    { id: 5, position: [-29.7, , 20.27], shape: "box" },

  ];**/
  }

  const adjustIslandForScreeSize = () => {
    let screenScale = null;
    let screenPosition = [0, 0, 0];
    let rotation = [0, 20, 0];
    if (window.innerWidth < 768) {
      screenScale = [5, 5, 5];
    } else {
      screenScale = [5.5, 5.5, 5.5];
    }
    return [screenScale, screenPosition, rotation];
  };

  const [islandscale, islandPosition, islanRotation] =
    adjustIslandForScreeSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000, position: [-50, 10, 21] }}
      >
        {/** camera={{ position: [0, 0, 10], near: 0.1, far: 1000 }}  **/}
        {/** <OrbitControls enableZoom={true} enablePan={true} />**/}
        {/** Componente de carga**/}

        <ambientLight intensity={0.3} />

        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          color="#ffffff"
          castShadow
        />
        {/* Sombras ajustadas */}
        <directionalLight
          position={[-5, 10, -5]}
          intensity={0.6}
          color="#ffd8a8"
        />
        <Sky />
        {/**  debug <AnimatedWater position={[10, -90, -6]} scale={[30, 20, 30]}  rotation = {[0.7, 0.2, 0]}/>**/}
        <Physics gravity={[0, -30, 0]}>
          <Grass
            position={[-38, -62, 16]}
            scale={300}
            rotation={islanRotation}
          />
          {/** 
          <Island
            position={islandPosition}
            scale={islandscale}
            rotation={islanRotation}
          /> **/}
          <CharacterController
            positiveChallengeStarted={positiveChallengeStarted}
          />
          {/**   <Clock position={[-13, 5, 24.4946]} scale={0.21} rotation={[0, -3, 0]}/>
          <Popsicle position={[-18, 6, 23.6]} scale={2} rotation={[0, 1, 0]}/>**/}
          {achievements
            .filter((achievement) => {
              if (achievement.found) return false;

              if (mindfulnessStarted) {
                return (
                  achievement.category === "mindfulness" ||
                  achievement.category === "iniciarMinfulness"
                );
              }

              if (positiveChallengeStarted) {
                return (
                  achievement.category === "aprendizaje" ||
                  achievement.category === "pensamientos" ||
                  achievement.category === "iniciarMinfulness"
                );
              }

              return (
                achievement.category === "aprendizaje" ||
                achievement.category === "pensamientos" ||
                achievement.category === "iniciarMinfulness"
              );
            })
            .map((achievement) => (
              <Achievement key={achievement.id} {...achievement} />
            ))}
        </Physics>
      </Canvas>
    </section>
  );
};

export default Game;
