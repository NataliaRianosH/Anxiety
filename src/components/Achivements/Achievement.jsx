import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useAchievements } from "../../context/AchievementsContext";
import { usePositiveThoughts } from "../../context/PositiveThoughtsContext";
import { useMindfulness } from "../../context/MindfulnessContext";
import { PositionalAudio } from "@react-three/drei";

const Achievement = ({
  id,
  position,
  geometry,
  collider,
  title,
  category,
  onShowLearning,
  shouldFloat, // recibe prop para flotar
}) => {
  const {
    positiveMessageValidated,
    startPositiveChallenge,
    endPositiveChallenge,
  } = usePositiveThoughts();
  const {
    mindfulnessCompleted,
    startMindfulness,
    endMindfulness,
    phase,
    nextPhase,
    completeMindfulness,
  } = useMindfulness(); // añadimos phase y nextPhase

  const { collectAchievement } = useAchievements();
  const [collected, setCollected] = useState(false);

  const floatRef = useRef(); //  para rotación/flotación
  const baseY = useRef(position[1]); //  guardamos Y original solo una vez

  //  efecto flotante y rotación
  useFrame((state) => {
    if (!shouldFloat || !floatRef.current) return;
    const t = state.clock.getElapsedTime();
    floatRef.current.position.y = Math.sin(t * 2) * 0.2;
    floatRef.current.rotation.y += 0.004; // velocidad lenta
  });

  const isPositiveChallenge = category === "pensamientos";
  const isMindfulnessStarter = category === "iniciarMinfulness"; //esto quiere decir que es el logro que va a activar el minijuego sobre mindfulness

  useEffect(() => {
    //console.log("Anxiety completed, osea si ya pasó/ganó el juego:", positiveMessageValidated);

    if (isPositiveChallenge && positiveMessageValidated && !collected) {
      console.log("Minijuego completado: recogiendo logro especial");
      setCollected(true);
      collectAchievement(id);
      endPositiveChallenge();
    }

    if (isMindfulnessStarter && mindfulnessCompleted && !collected) {
      console.log("Mindfulness completado: recogiendo logro especial");
      setCollected(true);
      collectAchievement(id);
      endMindfulness();
    }
  }, [
    positiveMessageValidated,
    isPositiveChallenge,
    collected,
    collectAchievement,
    id,
    mindfulnessCompleted,
    isMindfulnessStarter,
    endMindfulness,
  ]);

  const handleCollision = () => {
    if (isPositiveChallenge) {
      console.log("Colisionaste con el logro especial: ", title);
      if (!positiveMessageValidated) {
        startPositiveChallenge();
      }
    } else if (isMindfulnessStarter) {
      console.log(
        "Colisionaste con el logro de inicio de mindfulness: ",
        title
      );
      if (!mindfulnessCompleted) {
        startMindfulness();
      }

      //En la fase 1 no se colisiona con el libro sino q se responde la pregunta del MindfulnessChallenge por eso no sale aquí
    } else if (category === "mindfulness") {
      if (id === 4 && phase === 2) {
        console.log("Reloj encontrado. Avanzando a la fase 3.");
        setCollected(true);
        collectAchievement(id);
        nextPhase();
        return;
      }
      if (id === 5 && phase === 3) {
        console.log("Paleta encontrada. Avanzando a la fase 4.");
        setCollected(true);
        collectAchievement(id);
        nextPhase();
        return;
      }
      if (id === 6 && phase === 4) {
        console.log("Perfume encontrado. Avanzando a la fase 5.");
        setCollected(true);
        collectAchievement(id);
        nextPhase();
        return;
      }
      if (id === 7 && phase === 5) {
        console.log("Pastel encontrado. Avanzando a la fase final.");
        setCollected(true);
        collectAchievement(id);
        nextPhase();
        return;
      }

      //console.log("Colisión con objeto mindfulness en fase no programada.");
    } else if (category === "aprendizaje") {
      //console.log("Colisionaste con un logro de aprendizaje:", title);
      setCollected(true);
      collectAchievement(id);
      if (onShowLearning) onShowLearning(); //  AVISA A GAMEVIEW
    } else {
      console.log("Colisionaste un logro normal: ", title);
      setCollected(true);
      collectAchievement(id);
    }
  };

  if (collected) return null;

  return (
    <RigidBody
      colliders={collider}
      type="fixed"
      position={position}
      userData={{ isAchievement: true, id }}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "character") {
          handleCollision();
        }
      }}
    >
      <group ref={shouldFloat ? floatRef : null}>
        {" "}
        {/* aplica animación solo si flota */}
        {title === "Reloj" && (
          <PositionalAudio
            url="/sounds/clock.mp3"
            distance={4} // hasta qué distancia se escucha
            loop
            autoplay
          />
        )}
        <mesh>
          {geometry}
          <meshStandardMaterial color="gold" />
        </mesh>
      </group>
    </RigidBody>
  );
};

export default Achievement;
