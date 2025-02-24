import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import flower from '../assets/preview/Flowerpot.glb';



export function Flowerpot(props) {
  const { nodes, materials } = useGLTF(flower)
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['flowerpot-ver1'].geometry}
        material={materials['Texture-base.014']}
        scale={100}
      />
    </group>
  )
}

useGLTF.preload(flower);
export default Flowerpot;