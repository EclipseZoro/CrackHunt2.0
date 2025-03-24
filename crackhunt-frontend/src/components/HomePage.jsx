import React from "react";
import "./HomePage.css";

import completeScene from "../assets/images/Group23.png";
import spiderWeb from "../assets/svgs/Clippathgroup.svg";
import branchPumpkins from "../assets/svgs/Group5.svg";
import charmander from "../assets/svgs/Group15.svg";
import soilBrown from "../assets/svgs/Vector(1).svg";
import trees from "../assets/svgs/trees.svg";
import clouds from "../assets/svgs/Clippathgroup(2).svg";
import gravestone from "../assets/svgs/Group1.svg";
import background from "../assets/images/Desktop1.png";
import Navbar from "./Navbar.jsx";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Background Image */}
      <img src={background} alt="Background" className="background-image" />
      
      {/* CrackHunt Title */}
      <h1 className="title">CRACKHUNT 2.0</h1>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Spider Web (with hover shake effect) */}
      <img src={spiderWeb} alt="Spider Web" className="spider-web" />
      
      {/* Branch with Pumpkins */}
      <img src={branchPumpkins} alt="Branch with Pumpkins" className="branch-pumpkins" />
      
      {/* Clouds */}
      <img src={clouds} alt="Clouds" className="clouds1" />
      <img src={clouds} alt="Clouds" className="clouds2" />
      
      {/* Trees */}
      <img src={trees} alt="Trees" className="trees" />
      
      {/* Complete Scene (Moon, House, Bats, Black Soil) */}
      <img src={completeScene} alt="Scene" className="complete-scene" />
      {/* dadadawdawdad */}
      {/* Gravestone */}
      <img src={gravestone} alt="Gravestone" className="gravestone" />
      
      {/* Brown Soil */}
      <img src={soilBrown} alt="Soil" className="soil-brown" />
      
      {/* Charmander */}
      <img src={charmander} alt="Charmander" className="charmander" />
    </div>
  );
};

export default HomePage;