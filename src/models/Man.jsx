import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import characterModel from '../assets/preview/avatars/avatarMan.glb';
import { useEffect } from 'react';

export function Man({ animation, ...props }) {
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
        <group name="Man">
          <skinnedMesh
            name="Man_1"
            geometry={nodes.Man_1.geometry}
            material={materials.ShirtMaterial}
            skeleton={nodes.Man_1.skeleton}
          />
          <skinnedMesh
            name="Man_2"
            geometry={nodes.Man_2.geometry}
            material={materials.SkinMaterial}
            skeleton={nodes.Man_2.skeleton}
          />
          <skinnedMesh
            name="Man_3"
            geometry={nodes.Man_3.geometry}
            material={materials.PantsMaterial}
            skeleton={nodes.Man_3.skeleton}
          />
          <skinnedMesh
            name="Man_4"
            geometry={nodes.Man_4.geometry}
            material={materials.EyesMaterial}
            skeleton={nodes.Man_4.skeleton}
          />
          <skinnedMesh
            name="Man_5"
            geometry={nodes.Man_5.geometry}
            material={materials.SocksMaterial}
            skeleton={nodes.Man_5.skeleton}
          />
          <skinnedMesh
            name="Man_6"
            geometry={nodes.Man_6.geometry}
            material={materials.HairMaterial}
            skeleton={nodes.Man_6.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(characterModel);

export default Man;