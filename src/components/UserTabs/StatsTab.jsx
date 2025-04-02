import React from "react";
import "../../assets/styles/UserTabs/UserStatsTab.scss";

const StatsTab = () => {
  // Simulamos valores por ahora
  const level = 1;
  const playTime = "0h 30m";
  const achievementsUnlocked = 0;
  const totalAchievements = 20;
  const missionsCompleted = 0;
  const totalMissions = 10;

  const calcProgress = (value, total) => `${(value / total) * 100}%`;

  return (
    <div className="stats-card">
      <h4 className="stats-title">Estadísticas del Juego</h4>

      <div className="stat-row">
        <span className="label">Nivel:</span>
        <span className="value">{level}</span>
      </div>

      <div className="stat-row">
        <span className="label">Tiempo de juego:</span>
        <span className="value">{playTime}</span>
      </div>

      <div className="stat-row">
        <span className="label">Logros desbloqueados:</span>
        <span className="value">{achievementsUnlocked}/{totalAchievements}</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: calcProgress(achievementsUnlocked, totalAchievements) }}
        />
      </div>

      <div className="stat-row">
        <span className="label">Misiones completadas:</span>
        <span className="value">{missionsCompleted}/{totalMissions}</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: calcProgress(missionsCompleted, totalMissions) }}
        />
      </div>
    </div>
  );
};

export default StatsTab;
