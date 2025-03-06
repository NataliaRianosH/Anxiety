
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import Model from '../assets/preview/Seashell.glb';


export function Seashell(props) {
  const { nodes, materials } = useGLTF(Model);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh'].geometry}
        material={materials.lambert9SG}
      />
     
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Node-Mesh_1'].geometry}
        material={materials.lambert10SG}
      /> 
    </group>
  )
}

useGLTF.preload(Model);
export default Seashell;