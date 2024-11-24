import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

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

  // Custom labels for each field
  const labels = {
    pregnancies: "Number of Pregnancies",
    glucose: "Glucose Level (mg/dL)",
    bloodPressure: "Blood Pressure (mm Hg)",
    skinThickness: "Skin Thickness (mm)",
    insulin: "Insulin Level (mu U/mL)",
    bmi: "BMI (Body Mass Index)",
    diabetesPedigreeFunction: "Diabetes Pedigree Function",
    age: "Age (years)",
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      const prediction = response.data.prediction;

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
      {/* Awareness Section */}
      <div className="awareness-section">
        <h2>Diabetes Awareness</h2>
        <p>Diabetes is a chronic condition affecting millions.</p>
        <ul>
          <li>Maintain a healthy weight and balanced diet.</li>
          <li>Exercise regularly to regulate blood sugar levels.</li>
          <li>Monitor your glucose levels periodically.</li>
          <li>Watch for symptoms like excessive thirst, fatigue.</li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <form className="styled-form" onSubmit={handleSubmit}>
          <h2>Diabetes Prediction</h2>
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label>{labels[key]}</label> {/* Use custom label here */}
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
        </form>
      </div>
    </div>
  );
};

const DiabeticCare = () => (
  <div className="care-container diabetic">
    <h2>You are Diabetic</h2>
    <ul>
      <li>Maintain a healthy diet.</li>
      <li>Exercise regularly.</li>
      <li>Monitor blood sugar levels.</li>
      <li>Take prescribed medications.</li>
    </ul>
  </div>
);

const NonDiabeticCare = () => (
  <div className="care-container non-diabetic">
    <h2>You are Not Diabetic</h2>
    <ul>
      <li>Regular health check-ups.</li>
      <li>Manage stress levels.</li>
      <li>Follow a healthy lifestyle.</li>
    </ul>
  </div>
);

const App = () => {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  // Persist dark mode in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

  // Apply dark mode or light mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div>
        {/* Dark Mode Toggle Icon */}
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? "🌙" : "🌞"}
        </button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diabetic-care" element={<DiabeticCare />} />
          <Route path="/non-diabetic-care" element={<NonDiabeticCare />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
