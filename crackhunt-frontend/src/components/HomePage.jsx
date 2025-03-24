import React from "react";
import "./HomePage.css";
import branchPumpkins from "../assets/svgs/Group5.svg";
import LeaderBoard from "../components/Leaderpage.jsx";
import charmander from "../assets/svgs/Group15.svg";
import background from "../assets/images/back.svg";
import Navbar from "./Navbar.jsx";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Background Image */}
      <img src={background} alt="Background" className="background-image" />
      {/* Navbar */}
      <Navbar />
      
      
      {/* Branch with Pumpkins */}
      <img src={branchPumpkins} alt="Branch with Pumpkins" className="branch-pumpkins" />
  
      {/* Charmander */}
      <img src={charmander} alt="Charmander" className="charmander" />
    </div>
  );
};

export default HomePage;