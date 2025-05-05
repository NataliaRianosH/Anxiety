import React, { useEffect, useRef, useState } from "react";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { MapControls, useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import { useAuth } from "../context/AuthContext";
import { Avatar1 } from "../models/Avatars/Avatar1";
import { Avatar2 } from "../models/Avatars/Avatar2";
import { Avatar3 } from "../models/Avatars/Avatar3";
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";
import { useMindfulness } from "../context/MindfulnessContext";

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

const CharacterController = ({ positiveChallengeStarted }) => {
  const { mindfulnessStarted, phase } = useMindfulness();

  const { user, partida } = useAuth();
  const avatarSkin = partida?.avatar_skin || "Avatar3";
  const isOnGround = useRef(false);

  /**
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
      
    ); */
  const WALK_SPEED = 3;
  const RUN_SPEED = 10;
  const ROTATION_SPEED = degToRad(0.5);
  const JUMP_FORCE = 10;

  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const [animation, setAnimation] = useState("Idle");

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
  const disableMovement = mindfulnessStarted && phase === 1;
  const phase2Movement = mindfulnessStarted && phase === 2;
  const phase3Movement = mindfulnessStarted && phase === 3;

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
    const activeElement = document.activeElement;
  if (
    activeElement &&
    (activeElement.tagName === "INPUT" ||
     activeElement.tagName === "TEXTAREA" ||
     activeElement.isContentEditable)
  ) {
    return; // No ejecutar nada si está escribiendo
  }
    if (rb.current) {
      const vel = rb.current.linvel();
      const position = rb.current.translation();
      //console.log( `Posicion del avatar: x=${position.x},y=${position.y}, z=${position.z}`);
      // Movimiento base con teclado
      const movement = { x: 0, z: 0 };

      if (get().forward) movement.z = 1;
      if (get().backward) movement.z = -1;
      if (get().left) movement.x = 1;
      if (get().right) movement.x = -1;


      // Movimiento con mouse (solo si no se usan teclas)
      /**
      const usingKeyboard = movement.x !== 0 || movement.z !== 0;
      const usingClick = isClicking.current && !usingKeyboard;
      const effectiveMovement = { ...movement };
      let speed = RUN_SPEED;
      // Si se está usando el click, calcular movimiento desde el mouse
      if (usingClick) {
        effectiveMovement.x = -mouse.x;
        effectiveMovement.z = mouse.y + 0.4;
      
        const distanciaMouse = Math.sqrt(mouse.x ** 2 + (mouse.y + 0.4) ** 2);
        speed = Math.min(WALK_SPEED + distanciaMouse * 10, RUN_SPEED);
      }
      
       */

      // Movimiento efectivo sin click (usa solo teclado)
      const effectiveMovement = { ...movement };

      // Invertir controles (solo horizontal) en fase 2
      if (phase2Movement) {
        effectiveMovement.x *= -1;
      }

      // Rotación del personaje (solo si se mueve)
      if (effectiveMovement.x !== 0 || effectiveMovement.z !== 0) {
        characterRotationTarget.current = Math.atan2(
          effectiveMovement.x,
          effectiveMovement.z
        );
      }

      // Rotación lateral con teclado
      if (effectiveMovement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * effectiveMovement.x;
      }

      // Velocidad adaptada por fase
      let speed = RUN_SPEED;

      if (positiveChallengeStarted || phase3Movement) {
        speed = WALK_SPEED;
      } else if (!phase2Movement) {
        speed = get().run ? RUN_SPEED : WALK_SPEED;
      }

      // FASE 1: bloqueado
      if (disableMovement) {
        vel.x = 0;
        vel.z = 0;
        setAnimation("Anxiety");
      }
      // Movimiento
      else if (effectiveMovement.x !== 0 || effectiveMovement.z !== 0) {
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;

        setAnimation(
          speed === RUN_SPEED
            ? "Running"
            : positiveChallengeStarted || phase3Movement
              ? "Walking_Sad"
              : "Walking"
        );
      } else {
        setAnimation(
          phase2Movement
            ? "Look_Around"
            : positiveChallengeStarted || phase3Movement
              ? "Idle_Sad"
              : "Idle"
        );
      }

      // Salto: solo si no es fase 1 ni fase 2
      const canJump =
        !positiveChallengeStarted && !disableMovement && !phase2Movement;

        if (get().jump && canJump && isOnGround.current) {
          const forwardX = Math.sin(rotationTarget.current + characterRotationTarget.current);
          const forwardZ = Math.cos(rotationTarget.current + characterRotationTarget.current);
          const isRunning = speed === RUN_SPEED;
        
          // Empuje hacia adelante al saltar corriendo
          vel.x = forwardX * (isRunning ? RUN_SPEED * 0.8 : WALK_SPEED * 0.5);
          vel.y = JUMP_FORCE;
          vel.z = forwardZ * (isRunning ? RUN_SPEED * 0.8 : WALK_SPEED * 0.5);
        
          isOnGround.current = false;
          
        }
        
        
        rb.current.setLinvel(vel, true);
        
      // Rotación suave del avatar
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );
    }

    // Movimiento de cámara
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.2);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.2);
      camera.lookAt(cameraLookAt.current);
    }
  });


  // x=-3.623488187789917,y=13.85675048828125, z=9.041946411132812
  return (
    <RigidBody
      colliders={false}
      position={[-3.8, 20.828047752380371, 8.1]}
      lockRotations
      ref={rb}
      name="character"
      onCollisionEnter={(e) => {
        if (e.colliderObject?.name?.includes("ground")) {
          isOnGround.current = true;
        }
      }}
      onCollisionExit={(e) => {
        if (e.colliderObject?.name?.includes("ground")) {
          isOnGround.current = false;
        }
      }}
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={-1.2} />
        <group ref={cameraPosition} position-y={0.7} position-z={-2.5} />
        <group ref={character}>
          {avatarSkin === "Avatar1" && (
            <Avatar1 scale={1.6} position-y={-2.3} animation={animation} />
          )}
          {avatarSkin === "Avatar2" && (
            <Avatar2 scale={1.6} position-y={-2.3} animation={animation} />
          )}
          {avatarSkin === "Avatar3" && (
            <Avatar3 scale={1.6} position-y={-2.3} animation={animation} />
          )}
        </group>
      </group>

      <CapsuleCollider args={[1.5, 1, 0]} />
    </RigidBody>
  );
};

export default CharacterController;
