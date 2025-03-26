import React from "react";
import "./LeaderBoard.css";
import background from "../assets/images/homebackground.png";
import board from "../assets/images/board.svg";
import ghost1 from "../assets/images/ghost1.svg";
import ghost2 from "../assets/images/ghost2.svg";
import trees1 from "../assets/svgs/trees.svg";
import trees2 from "../assets/svgs/trees2.svg";
import bottom from "../assets/images/bottom.svg";
import Navbar from "./Navbar.jsx";

const LeaderBoard = () => {
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
      <div className="Navbarparent">
        {/* Navbar */}
      <Navbar />
      </div>
      <div className="boardparent">
        <img 
                src={board} 
                alt="board" 
                className="board" 
              />
       
    </div>
      <div className="ghost1parent">
        <img 
                src={ghost1} 
                alt="board" 
                className="ghost1" 
              />
       
    </div>
      <div className="ghost2parent">
        <img 
                src={ghost2} 
                alt="board" 
                className="ghost1" 
              />
       
    </div>
      <div className="bottomparent">
        <img 
                src={bottom} 
                alt="board" 
                className="bottom" 
              />
       
    </div>
      <div className="trees1parent">
        <img 
                src={trees1} 
                alt="board" 
                className="trees1" 
              />
       
    </div>
      <div className="trees2parent">
        <img 
                src={trees2} 
                alt="board" 
                className="trees2" 
              />
       
    </div>
     
    </div>
    
      
  );
};

export default LeaderBoard;