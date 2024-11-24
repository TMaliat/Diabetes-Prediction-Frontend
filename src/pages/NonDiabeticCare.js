import React from "react";
import "../App.css";

const NonDiabeticCare = () => {
  return (
    <div className="main-container">
      <div className="child-div result">
        <h2>Result</h2>
        <p>You are not diabetic. Maintain a healthy lifestyle!</p>
      </div>
      <div className="child-div care">
        <h3>Endocrinology Care</h3>
        <ul>
          <li>Regular health check-ups</li>
          <li>Stress management</li>
          <li>Balanced nutrition</li>
        </ul>
      </div>
    </div>
  );
};

export default NonDiabeticCare;
