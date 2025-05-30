/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import Model from '../../assets/preview/Island/Ista_terreno.glb';
import { RigidBody } from '@react-three/rapier';


export function Terreno({ onLoaded, ...props }) {
  const { nodes, materials } = useGLTF(Model)
  
  useEffect(() => {
    if (onLoaded) {
      onLoaded(); // avisar q se cargó
    }
  }, []);
  return (
      <RigidBody  name="ground"  type="fixed" colliders="trimesh">
    <group {...props} dispose={null}>
      <mesh
        castShadow 
        receiveShadow
        geometry={nodes.Terrain001.geometry}
        material={materials.Material}
        position={[-5.497, 2.734, 10.794]}
        scale={1.765}
      />
    </group>
    </RigidBody>
  )
}

useGLTF.preload(Model)
export default Terreno;