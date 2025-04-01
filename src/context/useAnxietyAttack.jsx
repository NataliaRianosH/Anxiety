import { useState, useEffect, useRef } from "react";

export const useAnxietyAttack = () => {
  const [anxietyAttack, setAnxietyAttack] = useState(false);
  const [anxietyCompleted, setAnxietyCompleted] = useState(false);
  const audioRef = useRef(new Audio("/sounds/heartbeat.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    if (anxietyAttack) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [anxietyAttack]);

  const startAnxietyAttack = () => {
    setAnxietyAttack(true);
    setAnxietyCompleted(false); // Reiniciamos el estado
  };

  const endAnxietyAttack = () => setAnxietyAttack(false);
  const completeAnxietyChallenge = () => setAnxietyCompleted(true);

  return {
    anxietyAttack,
    anxietyCompleted,
    startAnxietyAttack,
    endAnxietyAttack,
    completeAnxietyChallenge,
  };
};

