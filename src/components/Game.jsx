import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";
import Island from "../models/Island";
import { Environment, OrbitControls } from "@react-three/drei";
import Sky from "../models/Sky";
import Grass from "../models/Grass";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import CharacterController from "./CharacterController";
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";
import Achievement from "./Achivements/Achievement";
import achievementsData from "./Achivements/AchivementsData";
import { useMindfulness } from "../context/MindfulnessContext";
import Popsicle from "../models/Popsicle";
import Clock from "../models/Clock";
import { useAchievements } from "../context/AchievementsContext";
import Water from "../models/Water";
import Terreno from "../models/Island/Terrain";
import { Rocas } from "../models/Island/Rocas";
import { Palmeras } from "../models/Island/Palmeras";
import LearningModal from "../components/modals/LearningModal"; //  importar el modal
import learningData from "../components/modals/learningData";
import GameCompleteModal from "./modals/GameCompleteModal";
import ResizeHandler from "./ResizeHandler";


const Game = () => {
  const { positiveChallengeStarted } = usePositiveThoughts();
  const { mindfulnessStarted, phase } = useMindfulness();
  const { achievements, collectAchievement } = useAchievements();
  const [learningModalOpen, setLearningModalOpen] = useState(false);
  const [learningModalData, setLearningModalData] = useState(null);
  const [showGameComplete, setShowGameComplete] = useState(false);
  const [terrainReady, setTerrainReady] = useState(false);

  useEffect(() => {
    const allFound = achievements.length > 0 && achievements.every(a => a.found);
    if (allFound && !showGameComplete) {
      setShowGameComplete(true);
    }
  }, [achievements]);
  
  const handleLearningCollision = (id) => {
    const data = learningData[id]; // obtenemos los datos desde el archivo
    if (data) {
      
      setLearningModalData(data);
    }
  };
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
      {!terrainReady && (
  <div className="absolute top-1/2 left-1/2 text-white text-xl">
    Cargando entorno...
  </div>
)}
      <Canvas
      
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000, position: [-50, 10, 21] }}
      >
        <ResizeHandler />
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
        {/**  debug  <AnimatedWater position={[10, -90, -6]} scale={[30, 20, 30]}  rotation = {[0.7, 0.2, 0]}/>**/}
        <Physics gravity={[0, -30, 0]}>
           {/**  <Grass position={[0, -18, 0]} scale={80} rotation={islanRotation} />
            **/}

          <Water></Water>
          <Rocas></Rocas>
          <Palmeras></Palmeras>
          <Terreno onLoaded={() => setTerrainReady(true)} />

          <RigidBody type="fixed" colliders={false}>
            <mesh position={[0, -20, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#1e90ff" transparent opacity={0.3} />
            </mesh>
            <CuboidCollider args={[70, 0.5, 70]} position={[0, -6, 0]} />
          </RigidBody>

          {/* PAREDES INVISIBLES ALREDEDOR DEL AGUA */}
          <RigidBody type="fixed">
            {/* Pared frontal */}
            <mesh position={[0, 10, 70]}>
              <boxGeometry args={[140, 40, 1]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.05}
              />
            </mesh>
            <CuboidCollider args={[70, 20, 0.5]} position={[0, 10, 70]} />

            {/* Pared trasera */}
            <mesh position={[0, 10, -70]}>
              <boxGeometry args={[140, 40, 1]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.05}
              />
            </mesh>
            <CuboidCollider args={[70, 20, 0.5]} position={[0, 10, -70]} />

            {/* Pared derecha */}
            <mesh position={[70, 10, 0]}>
              <boxGeometry args={[1, 40, 140]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.05}
              />
            </mesh>
            <CuboidCollider args={[0.5, 20, 70]} position={[70, 10, 0]} />

            {/* Pared izquierda */}
            <mesh position={[-70, 10, 0]}>
              <boxGeometry args={[1, 40, 140]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.05}
              />
            </mesh>
            <CuboidCollider args={[0.5, 20, 70]} position={[-70, 10, 0]} />
          </RigidBody>

          {/** 
          <Island
            position={islandPosition}
            scale={islandscale}
            rotation={islanRotation}
          /> **/}
          {terrainReady && (
  <CharacterController positiveChallengeStarted={positiveChallengeStarted} />
)}

          {/**   <Clock position={[-13, 5, 24.4946]} scale={0.21} rotation={[0, -3, 0]}/>
          <Popsicle position={[-18, 6, 23.6]} scale={2} rotation={[0, 1, 0]}/>**/}
          {achievements
            .filter((achievement) => {
              if (achievement.found) return false;

              if (mindfulnessStarted) {
                // Mostrar solo 1 objeto por fase específica
                const mindfulnessIdsPorFase = {
                  1: 3, // Libro
                  2: 4, // Reloj
                  3: 5, // Paleta
                  4: 6, // Perfume
                  5: 7, // Pastel
                };

                return achievement.id === mindfulnessIdsPorFase[phase];
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
              <Achievement key={achievement.id} {...achievement} onShowLearning={() => handleLearningCollision(achievement.id)} />
            ))}
           

        </Physics>
      </Canvas>
      {/*  Modal estático fuera del Canvas */}
      {learningModalData && (
  <LearningModal
    isOpen={true}
    data={learningModalData}
    onClose={() => setLearningModalData(null)}
  />
)}
{showGameComplete && (
  <GameCompleteModal onClose={() => setShowGameComplete(false)} />
)}

    </section>
  );
};

export default Game;
