import React from "react";
import "./profile.css";
import background from "../assets/images/homebackground.png";
import board from "../assets/images/board.svg";
import ghost1 from "../assets/images/ghost1.svg";
import ghost2 from "../assets/images/ghost2.svg";
import pokemon from "../assets/images/pokemon.svg";
import trees1 from "../assets/svgs/trees.svg";
import trees2 from "../assets/svgs/trees2.svg";
import bottom from "../assets/images/bottom.svg";
import Navbar from "./Navbar.jsx";

const Profile = () => {
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

      <div className="centreblackboxparent">
        <div className="centreblackbox"></div>
      </div>
      

      
      <div className="usernameformparent"> 
        <div className="usernameformgrid">
        <div className="usertextparent">
        <div className="usertext">
            Username
        </div>
      </div>
        <div className="ranktextparent">
        <div className="ranktext">
            Rank
        </div>
      </div>
      <div className="ranknameEntryparent">
        <div className="ranknameentry">
     </div>

        </div>
        <div className="scoretextparent">
            <div className="scoretext">
                score
            </div>
        </div>
        <div className="scorenameEntryparent">
            <div className="scorenameentry"></div>
        </div>

        <div className="usernameEntryparent">
            <div className="usernameentry"></div>
        </div>
      
      </div>
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

    <div className="pokemonwallagridparent">
        <div className="pokemonwallagrid">

        <div className="profiletextparent">
            <div className="profiletext">
                Profile
            </div>
        </div>
        <div className="avatartextparent">
            <div className="avatartext">
                Avatar
            </div>
        </div>
        <div className="Pokemonparent">
            <img 
                    src={pokemon} 
                    alt="board" 
                    className="pokemon" 
                />
        
        </div>
    </div>
    </div>
    </div>
      
  );
};

export default Profile;