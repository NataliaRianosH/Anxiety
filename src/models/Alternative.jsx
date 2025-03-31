
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import characterModel from '../assets/preview/avatars/avataralternative.glb'; 
import { useEffect } from 'react';


export function Alternative({ animation, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(characterModel)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
        //console.log(actions);
        actions[animation]?.reset().fadeIn(0.24).play();
        return () => actions?.[animation]?.fadeOut(0.24);
        
      }, [animation]);

  return (
    <group ref={group} {...props} dispose={null}>
    <group name="Scene">
      <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
      </group>
      <group name="Alternative">
        <skinnedMesh
          name="Alternative_1"
          geometry={nodes.Alternative_1.geometry}
          material={materials.SkinMaterial}
          skeleton={nodes.Alternative_1.skeleton}
        />
        <skinnedMesh
          name="Alternative_2"
          geometry={nodes.Alternative_2.geometry}
          material={materials.EyesMaterial}
          skeleton={nodes.Alternative_2.skeleton}
        />
        <skinnedMesh
          name="Alternative_3"
          geometry={nodes.Alternative_3.geometry}
          material={materials.EyebrowsMaterial}
          skeleton={nodes.Alternative_3.skeleton}
        />
        <skinnedMesh
          name="Alternative_4"
          geometry={nodes.Alternative_4.geometry}
          material={materials.ShirtMaterial}
          skeleton={nodes.Alternative_4.skeleton}
        />
        <skinnedMesh
          name="Alternative_5"
          geometry={nodes.Alternative_5.geometry}
          material={materials.PantsMaterial}
          skeleton={nodes.Alternative_5.skeleton}
        />
        <skinnedMesh
          name="Alternative_6"
          geometry={nodes.Alternative_6.geometry}
          material={materials.ShoesMaterial}
          skeleton={nodes.Alternative_6.skeleton}
        />
        <skinnedMesh
          name="Alternative_7"
          geometry={nodes.Alternative_7.geometry}
          material={materials.HairBaseMaterial}
          skeleton={nodes.Alternative_7.skeleton}
        />
        <skinnedMesh
          name="Alternative_8"
          geometry={nodes.Alternative_8.geometry}
          material={materials.JacketMaterial}
          skeleton={nodes.Alternative_8.skeleton}
        />
        <skinnedMesh
          name="Alternative_9"
          geometry={nodes.Alternative_9.geometry}
          material={materials.LightJacketMaterial}
          skeleton={nodes.Alternative_9.skeleton}
        />
        <skinnedMesh
          name="Alternative_10"
          geometry={nodes.Alternative_10.geometry}
          material={materials.HairMaterial}
          skeleton={nodes.Alternative_10.skeleton}
        />
      </group>
    </group>
  </group>
  )
}

useGLTF.preload(characterModel);
export default Alternative;