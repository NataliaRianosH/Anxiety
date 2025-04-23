
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import Model from '../../assets/preview/Achivements/Caracola.glb';

export function Caracola(props) {
  const { nodes, materials } = useGLTF(Model)
  return ( 
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Caracola.geometry}
        material={materials.Caracola}
        position={[0,0,0]}
        scale={0.13}
      />
    </group>
  )
}

useGLTF.preload(Model)
export default Caracola;
