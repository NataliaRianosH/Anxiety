
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import characterModel from '../assets/preview/Smooth_Female_Alternative.glb'; 
import { useEffect } from 'react';


export function Alternative({ animation, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(characterModel)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
        console.log(actions);
        actions[animation]?.reset().fadeIn(0.24).play();
        return () => actions?.[animation]?.fadeOut(0.24);
        
      }, [animation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="HumanArmature">
          <group name="Female">
            <skinnedMesh
              name="Cylinder006"
              geometry={nodes.Cylinder006.geometry}
              material={materials.Skin}
              skeleton={nodes.Cylinder006.skeleton}
            />
            <skinnedMesh
              name="Cylinder006_1"
              geometry={nodes.Cylinder006_1.geometry}
              material={materials.Eyes}
              skeleton={nodes.Cylinder006_1.skeleton}
            />
            <skinnedMesh
              name="Cylinder006_2"
              geometry={nodes.Cylinder006_2.geometry}
              material={materials.Eyebrows}
              skeleton={nodes.Cylinder006_2.skeleton}
            />
            <skinnedMesh
              name="Cylinder006_3"
              geometry={nodes.Cylinder006_3.geometry}
              material={materials.Shirt}
              skeleton={nodes.Cylinder006_3.skeleton}
            />
            <skinnedMesh
              name="Cylinder006_4"
              geometry={nodes.Cylinder006_4.geometry}
              material={materials.Pants}
              skeleton={nodes.Cylinder006_4.skeleton}
            />
            <skinnedMesh
              name="Cylinder006_5"
              geometry={nodes.Cylinder006_5.geometry}
              material={materials.Shoes}
              skeleton={nodes.Cylinder006_5.skeleton}
            />
            <skinnedMesh
              name="Cylinder006_6"
              geometry={nodes.Cylinder006_6.geometry}
              material={materials.HairBase}
              skeleton={nodes.Cylinder006_6.skeleton}
            />
            <skinnedMesh
              name="Cylinder006_7"
              geometry={nodes.Cylinder006_7.geometry}
              material={materials.Jacket}
              skeleton={nodes.Cylinder006_7.skeleton}
            />
            <skinnedMesh
              name="Cylinder006_8"
              geometry={nodes.Cylinder006_8.geometry}
              material={materials.LightJacket}
              skeleton={nodes.Cylinder006_8.skeleton}
            />
            <skinnedMesh
              name="Cylinder006_9"
              geometry={nodes.Cylinder006_9.geometry}
              material={materials.Hair}
              skeleton={nodes.Cylinder006_9.skeleton}
            />
          </group>
          <primitive object={nodes.Bone} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(characterModel);
export default Alternative;