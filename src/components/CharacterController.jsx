import React, { useEffect, useRef, useState } from "react";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import Character from "../models/Character";
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { MapControls, useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import { Man } from "../models/Man";
import { Alternative } from "../models/Alternative";
import { useAuth } from "../context/AuthContext";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

const CharacterController = () => {
  const { user, partida } = useAuth();
  const avatarSkin = partida?.avatar_skin || "Female";

  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED, JUMP_FORCE } = useControls(
    "Character Control",
    {
      WALK_SPEED: { value: 3, min: 0.1, max: 5, step: 0.1 },
      RUN_SPEED: { value: 10, min: 0.2, max: 12, step: 0.1 },
      ROTATION_SPEED: {
        value: degToRad(0.5),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
      JUMP_FORCE: { value: 10, min: 5, max: 20, step: 1 },
    }
  );

  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const [animation, setAnimation] = useState("Female_Idle");

  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);

  const isJumping = useRef(false);

  useEffect(() => {
    console.log(avatarSkin);
    const onMouseDown = (e) => {
      isClicking.current = true;
    };
    const onMouseUp = (e) => {
      isClicking.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    // touch
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, []);

  useFrame(({ camera, mouse }) => {
    if (rb.current) {
      const vel = rb.current.linvel();

      // Obtener la posición actual del avatar
    const position = rb.current.translation();
    //console.log(`Posición del avatar: x=${position.x}, y=${position.y}, z=${position.z}`);


      const movement = {
        x: 0,
        z: 0,
      };

      if (get().forward) {
        movement.z = 1;
      }
      if (get().backward) {
        movement.z = -1;
      }

      let speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (isClicking.current) {
        // console.log("clicking", mouse.x, mouse.y);
        if (Math.abs(mouse.x) > 0.1) {
          movement.x = -mouse.x;
        }
        movement.z = mouse.y + 0.4;
        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = RUN_SPEED;
        }
      }

      if (get().left) {
        movement.x = 1;
      }
      if (get().right) {
        movement.x = -1;
      }

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
        if (speed === RUN_SPEED) {

          setAnimation(avatarSkin === "Female" || avatarSkin === "Alternative" ? "Female_Run" : "HumanArmature|Man_Run");

        
        } else {
          setAnimation(avatarSkin === "Female" || avatarSkin === "Alternative" ? "Female_Walk" : "HumanArmature|Man_Walk");
        }
      } else {
        
        setAnimation(avatarSkin === "Female" || avatarSkin === "Alternative" ? "Female_Idle" : "HumanArmature|Man_Idle");

      }
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );

      if (get().jump) {
        vel.y = JUMP_FORCE;
        setAnimation(avatarSkin === "Female" || avatarSkin === "Alternative" ? "Female_Jump" : "HumanArmature|Man_Jump");

        //console.log("Jumping");
      }

      rb.current.setLinvel(vel, true);
    }

    // CAMERA
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody colliders={false} position={[-38, 6, 16]} lockRotations ref={rb} name="character"
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={4} position-z={-4} />
        <group ref={character}>
          {avatarSkin === "Female" && (
            <Character scale={1} position-y={-2.3} animation={animation} />
          )}
          {avatarSkin === "Man" && (
            <Man scale={1} position-y={-2.3} animation={animation} />
          )}
          {avatarSkin === "Alternative" && (
            <Alternative scale={1} position-y={-2.3} animation={animation} />
          )}
        </group>
      </group>

      <CapsuleCollider args={[1.5, 1, 0]} />
    </RigidBody>
  );
};

export default CharacterController;
