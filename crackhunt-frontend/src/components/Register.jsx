import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/images/homebackground.png";
import trees1 from "../assets/svgs/trees.svg";
import trees2 from "../assets/svgs/trees2.svg";
import bottom from "../assets/images/bottom.svg";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (localStorage.getItem(username)) {
      setError("Username already exists. Try a different one.");
    } else {
      localStorage.setItem(username, JSON.stringify({ username, password }));
      alert("Registration successful! You can now log in.");
      navigate("/profile");
    }
  };

  return (
    <div className="home-container">
      {/* Background Image */}
      <div className="background-wrapper">
        <img src={background} alt="Background" className="background-image" />
      </div>
      <div className="bottomparent">
        <img src={bottom} alt="bottom" className="bottom" />
      </div>
      <div className="trees1parent">
        <img src={trees1} alt="trees1" className="trees1" />
      </div>
      <div className="trees2parent">
        <img src={trees2} alt="trees2" className="trees2" />
      </div>
      <div className="centreblackboxparent">
        <div className="centreblackbox"></div>
      </div>

      <div className="registerformparent">
        <div className="registerformgrid">
          {/* Username Field */}
          <div className="usertextparent">
            <div className="usertext">Username</div>
          </div>
          <div className="username-input-container">
            <input
              type="text"
              className="username-input"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="usertextparent">
            <div className="usertext">Password</div>
          </div>
          <div className="password-input-container">
            <input
              type="password"
              className="password-input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Register Button */}
          <div className="register-button-container">
            <button className="register-button" onClick={handleRegister}>
              Register
            </button>
          </div>

          {/* Back to Login Link */}
          <div className="back-link">
            <p>Already have an account?</p>
            <button className="back-button" onClick={() => navigate("/profile")}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
