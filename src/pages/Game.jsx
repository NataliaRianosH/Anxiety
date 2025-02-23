import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import { Environment, OrbitControls } from '@react-three/drei'
import Sky from '../models/Sky'
import Character from '../models/Character'
import Grass from '../models/Grass'
import { Physics, RigidBody } from '@react-three/rapier';
import CharacterController from '../components/CharacterController'
import { Man } from '../models/Man'

const Game = () => {

  
  const adjustIslandForScreeSize = () => {
    let screenScale = null;
    let screenPosition = [0, 0, 0];
    let rotation = [0, 20, 0];
    if (window.innerWidth < 768) {
      screenScale = [0.5, 0.5, 0.5]
    } else {
      screenScale = [0.8, 0.8, 0.8]

    }
    return [screenScale, screenPosition, rotation]
  }

  const [islandscale, islandPosition, islanRotation] = adjustIslandForScreeSize();


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
        {/**<AnimatedWater position={[10, -90, -6]} scale={[30, 20, 30]}  rotation = {[0.7, 0.2, 0]}/>**/}
        <Physics debug gravity={[0, -30, 0]}>
          <Grass  position={[-38, -70, 16]}
            scale={300}
            rotation={islanRotation}/>
          {/** <Island
            position={islandPosition}
            scale={islandscale}
            rotation={islanRotation}
          />*/}

          <CharacterController />
        </Physics>
      </Canvas>
    </section>
  );
}

export default Game