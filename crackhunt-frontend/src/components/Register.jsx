import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background from "../assets/images/homebackground.png";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Both fields are required");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/register/", {
        username: trimmedUsername,
        password: trimmedPassword,
      });
      

      alert("Registration successful! You can now log in.");
      navigate("/profile");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Registration failed. Please try again.");
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="background-wrapper">
        <img src={background} alt="Background" className="background-image" />
      </div>
      <div className="registerformparent">
        <div className="registerformgrid">
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

          <div className="usertextparent">
            <div className="usertext">Password</div>
          </div>
          <div className="password-input-container">
            <input
              type="password"
              className="password-input"
              placeholder="Enter Password (Min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="register-button-container">
            <button className="register-button" onClick={handleRegister} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <div className="back-link">
            <p>Already have an account?</p>
            <button className="back-button" onClick={() => navigate("/login")}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
