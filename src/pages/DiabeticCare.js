import React from "react";
import "../App.css";

const DiabeticCare = () => {
  return (
    <div className="main-container">
      <div className="child-div result">
        <h2>Result</h2>
        <p>You are diabetic. Please take care of your health.</p>
      </div>
      <div className="child-div care">
        <h3>Care for Diabetes</h3>
        <ul>
          <li>Maintain a balanced diet</li>
          <li>Regular exercise</li>
          <li>Monitor blood sugar</li>
          <li>Take prescribed medications</li>
        </ul>
      </div>
    </div>
  );
};

export default DiabeticCare;
