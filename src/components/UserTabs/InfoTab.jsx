import React from "react";
import { FaEdit } from "react-icons/fa";
import "../../assets/styles/UserTabs/UserInfoTab.scss"; 

const InfoTab = () => {
  return (
    <div className="info-card">
      <div className="info-row">
        <span className="label">Email:</span>
        <span className="value">luquitas@correo.com</span>
      </div>
      <div className="info-row">
        <span className="label">Avatar:</span>
        <span className="value">pepita</span>
      </div>
      <div className="info-row">
        <span className="label">Skin:</span>
        <span className="value">Alternative</span>
      </div>
      <div className="info-row">
        <span className="label">Progreso:</span>
        <span className="value">0%</span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: "0%" }}></div>
      </div>
      <div className="edit-button-container">
        <button className="edit-button">
          <FaEdit size={12} />
          Editar
        </button>
      </div>
    </div>
  );
};

export default InfoTab;
