import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import characterModel from '../assets/preview/avatars/avatarFemale.glb'; 


export function Female({ animation, ...props }) {
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
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.003}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <group name="Female">
          <skinnedMesh
            name="Female_1"
            geometry={nodes.Female_1.geometry}
            material={materials.SkinMaterial}
            skeleton={nodes.Female_1.skeleton}
          />
          <skinnedMesh
            name="Female_2"
            geometry={nodes.Female_2.geometry}
            material={materials.EyesMaterial}
            skeleton={nodes.Female_2.skeleton}
          />
          <skinnedMesh
            name="Female_3"
            geometry={nodes.Female_3.geometry}
            material={materials.HairMaterial}
            skeleton={nodes.Female_3.skeleton}
          />
          <skinnedMesh
            name="Female_4"
            geometry={nodes.Female_4.geometry}
            material={materials.DressMaterial}
            skeleton={nodes.Female_4.skeleton}
          />
          <skinnedMesh
            name="Female_5"
            geometry={nodes.Female_5.geometry}
            material={materials.ShoesMaterial}
            skeleton={nodes.Female_5.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(characterModel)