import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "../App.css";

// Home Page with Awareness and Prediction Form
const Home = () => {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
  });

  const [result, setResult] = useState("");
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      pregnancies: Number(formData.pregnancies),
      glucose: Number(formData.glucose),
      bloodPressure: Number(formData.bloodPressure),
      skinThickness: Number(formData.skinThickness),
      insulin: Number(formData.insulin),
      bmi: Number(formData.bmi),
      diabetesPedigreeFunction: Number(formData.diabetesPedigreeFunction),
      age: Number(formData.age),
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", dataToSend);
      const prediction = response.data.prediction;

      setResult(prediction); // Display result for confirmation
      if (prediction === "Diabetic") {
        navigate("/diabetic-care");
      } else {
        navigate("/non-diabetic-care");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error making prediction");
    }
  };

  return (
    <div className="app-container">
      <div className="awareness-section">
        <h2>Diabetic Awareness</h2>
        <p>
          Diabetes is a chronic condition affecting millions globally. Early diagnosis and lifestyle
          changes can help manage and prevent complications.
        </p>
        <ul>
          <li>Maintain a healthy weight and balanced diet.</li>
          <li>Exercise regularly to regulate blood sugar levels.</li>
          <li>Monitor glucose levels and consult a doctor if needed.</li>
          <li>Be aware of symptoms like excessive thirst, fatigue, or frequent urination.</li>
        </ul>
        <div className="additional-awareness">
          <h3>Important Statistics</h3>
          <p>
            <strong>422 million:</strong> People worldwide are living with diabetes.
          </p>
          <p>
            <strong>1.5 million:</strong> Deaths annually are attributed to diabetes.
          </p>
          <p>
            <strong>Healthy Tip:</strong> Incorporate whole grains, vegetables, and lean proteins in
            your meals.
          </p>
        </div>
        <img
          src="https://www.diabetes.org/sites/default/files/styles/thumbnail/public/2021-10/healthy-foods.png"
          alt="Diabetes Awareness"
          className="awareness-image"
        />
      </div>

      <div className="form-section">
        <form className="styled-form" onSubmit={handleSubmit}>
          <h2>Diabetes Prediction</h2>
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="submit-button">
            Predict
          </button>
          {result && <h2>Prediction Result: {result}</h2>}
        </form>
      </div>
    </div>
  );
};

// Diabetic Care Page
const DiabeticCare = () => {
  return (
    <div className="main-container">
      <h2>You are Diabetic</h2>
      <h3>Care for Diabetes</h3>
      <ul>
        <li>Maintain a healthy diet</li>
        <li>Exercise regularly</li>
        <li>Monitor blood sugar levels</li>
        <li>Take prescribed medications</li>
      </ul>
    </div>
  );
};

// Non-Diabetic Care Page
const NonDiabeticCare = () => {
  return (
    <div className="main-container">
      <h2>You are not Diabetic</h2>
      <h3>Endocrinology Care</h3>
      <ul>
        <li>Regular health check-ups</li>
        <li>Manage stress levels</li>
        <li>Follow a healthy lifestyle</li>
      </ul>
    </div>
  );
};

// Main App Router
const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diabetic-care" element={<DiabeticCare />} />
        <Route path="/non-diabetic-care" element={<NonDiabeticCare />} />
      </Routes>
    </Router>
  );
};

export default MainApp;
