import React from "react";
import "./LeaderBoard.css";
import background from "../assets/images/leaderback2.svg";
import board from "../assets/images/board.svg";
import ghost1 from "../assets/images/ghost1.svg";
import ghost2 from "../assets/images/ghost2.svg";
import Navbar from "./Navbar.jsx";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Background Image */}
      <div className="background-wrapper">
        <img 
          src={background} 
          alt="Background" 
          className="background-image" 
        />
      </div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Board */}
      <img src={board} alt="board" className="board" />
      
      {/* Ghost 1 with Tooltip */}
      <div className="ghost1-container">
        <img src={ghost1} alt="Ghost 1" className="ghost1" />
        <div className="ghost1-tooltip">
          Climb the ladder or go to grave
        </div>
      </div>
      
      {/* Ghost 2 with Tooltip */}
      <div className="ghost2-container">
        <img src={ghost2} alt="Ghost 2" className="ghost2" />
        <div className="ghost2-tooltip">
          Welcome to the Leaderboard
        </div>
      </div>
    </div>
  );
};

export default HomePage;