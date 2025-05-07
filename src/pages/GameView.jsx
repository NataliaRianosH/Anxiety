import React, { useEffect, useRef, useState } from "react";
import GameMenu from "../components/GameMenu";
import { usePositiveThoughts } from "../context/PositiveThoughtsContext";
import Game from "../components/Game";
import PositiveChallenge from "../components/PositiveChallenge";
import { useMindfulness } from "../context/MindfulnessContext";
import MindfulnessChallenge from "../components/MindfulnessChallenge";

const GameView = () => {
  const { positiveChallengeStarted, endPositiveChallenge } =
    usePositiveThoughts();
  const { mindfulnessStarted, endMindfulness, phase } = useMindfulness();
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50); // porcentaje

  useEffect(() => {
    const audio = new Audio("/sounds/birds.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  // silenciar cuando cambie isMuted
  useEffect(() => {
    if (audioRef.current) {
      const vol = volume / 100;
      audioRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  }, [volume]);

  return (
    <div
      className={`game-container ${
        positiveChallengeStarted || mindfulnessStarted ? "blurred" : ""
      }`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <GameMenu
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        volume={volume}
        setVolume={setVolume}
      />

      <Game />
      {(positiveChallengeStarted || (mindfulnessStarted && phase !== 5 && phase !== 6 )) && (
        <div className="anxiety-overlay"></div>
      )}
      {positiveChallengeStarted && (
        <PositiveChallenge
          onSuccess={() => {
            endPositiveChallenge();
          }}
        />
      )}
      {mindfulnessStarted && <MindfulnessChallenge />}
    </div>
  );
};

export default GameView;
