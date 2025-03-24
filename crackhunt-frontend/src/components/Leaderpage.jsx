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
      <img src={background} alt="Background" className="background-image" />
      {/* Navbar */}
      <Navbar />

      <img src={board} alt="board" className="board" />
      <img src={ghost1} alt="board" className="ghost1" />
      <img src={ghost2} alt="board" className="ghost2" />
    </div>
  );
};

export default HomePage;