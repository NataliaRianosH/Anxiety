import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import clockModel from '../assets/preview/Achivements/clock.glb';


export function Clock(props) {
    const { nodes, materials } = useGLTF(clockModel)
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Analog_clock_Circle001-Mesh'].geometry}
          material={materials.FFFFFF}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Analog_clock_Circle001-Mesh_1'].geometry}
          material={materials['795548']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Analog_clock_Circle001-Mesh_2'].geometry}
          material={materials['1A1A1A']}
        />
      </group>
    )
}

useGLTF.preload(clockModel)

export default Clock;
