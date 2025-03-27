import React, { useEffect, useState } from "react";
import axios from "axios";
import "./games.css";
import background from "../assets/images/homebackground.png";
import trees1 from "../assets/svgs/trees.svg";
import trees2 from "../assets/svgs/trees2.svg";
import bottom from "../assets/images/bottom.svg";
import Navbar from "./Navbar.jsx";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/", { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      {/* Background Image */}
      <div className="background-wrapper">
        <img src={background} alt="Background" className="background-image" />
      </div>
      <div className="Navbarparent">
        <Navbar />
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
      <div className="maingridtemplateforgamesparent">
        <div className="maingridtemplateforgames">
            <div className="gamesrow1">
            <div className="game1"></div>
            <div className="game2"></div>
            <div className="game3"></div>
            <div className="game4"></div>
            </div>
            <div className="gamesrow2">
            <div className="game5"></div>
            <div className="game6"></div>
            <div className="game7"></div>
            <div className="game8"></div>
            </div>
            <div className="gamesrow3">
            <div className="game9"></div>
            <div className="game10"></div>
            <div className="game11"></div>
            <div className="game12"></div>
            </div>
            <div className="gamesrow4">
            <div className="game13"></div>
            <div className="game14"></div>
            <div className="game15"></div>
            <div className="game16"></div>
            </div>
            
            

        </div>
      </div>

      
    </div>
  );
};

export default Profile;
