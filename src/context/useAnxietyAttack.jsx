import { useState, useEffect, useRef } from "react";

export const useAnxietyAttack = () => {
  const [anxietyAttack, setAnxietyAttack] = useState(false);
  const audioRef = useRef(new Audio("/sounds/heartbeat.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true; // Para que el sonido se repita

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

  const startAnxietyAttack = () => setAnxietyAttack(true);
  const endAnxietyAttack = () => setAnxietyAttack(false);

  return {
    anxietyAttack,
    startAnxietyAttack,
    endAnxietyAttack,
  };
};
