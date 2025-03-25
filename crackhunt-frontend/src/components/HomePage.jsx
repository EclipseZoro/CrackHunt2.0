
import React from "react";
import "./HomePage.css";
import branchPumpkins from "../assets/svgs/Group5.svg";
import LeaderBoard from "../components/Leaderpage.jsx";
import charmander from "../assets/svgs/Group15.svg";
import crackhunt from "../assets/images/crackhuntText.svg";
import trees from "../assets/svgs/trees.svg";
import bottom from "../assets/images/bottom.svg";
import centre from "../assets/images/centre.svg";
import background from "../assets/images/homebackground.png";
import Navbar from "./Navbar.jsx";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Background Image - Added div wrapper for more control */}
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
      
      <div className="branchPumpkinsParent">
        {/* Branch with Pumpkins */}
      <img 
        src={branchPumpkins} 
        alt="Branch with Pumpkins" 
        className="branch-pumpkins" 
      />
      </div>
      <div className="treeParent">
      <img 
        src={trees} 
        alt="trees" 
        className="trees" 
      />
      </div>
      
     
      {/* cracjhunt */}
     <div className="cracktextparent">
     <img 
        src={crackhunt} 
        alt="Crackhunt Text" 
        className="crackhuntText" 
      />
     </div>
     <div className="bottomParent">
     <img 
        src={bottom} 
        alt="Crackhunt Text" 
        className="bottom" 
      />
      </div> 
      
      <div className="centreparent">
      <img 
        src={centre} 
        alt="Crackhunt Text" 
        className="centre" 
      />


      </div>
      
     
    <div className="charmanderparent">
       {/* Charmander */}
       <img 
        src={charmander} 
        alt="Charmander" 
        className="charmander" 
      />
      <div className="logpoint">
        Welcome to the Game Players
      </div>
      
    </div>
    </div>
     
  );
};

export default HomePage;
