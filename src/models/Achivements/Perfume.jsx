/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import perfumeModel from '../../assets/preview/Achivements/Perfume.glb';

export function Perfume(props) {
  const { nodes, materials } = useGLTF(perfumeModel)
  return (
    <group {...props} dispose={null}>
      <group position={[0,0.5,0]} rotation={[0, 0, 0]} scale={0.5}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Perfume_1.geometry}
          material={materials['Perfume 2']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Perfume_2.geometry}
          material={materials['Perfume 1']}
        />
      </group>
    </group>
  )
}

useGLTF.preload(perfumeModel)
export default Perfume;
