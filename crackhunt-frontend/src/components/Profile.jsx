import React, { useEffect, useState } from "react";
import axios from "axios";
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

      <div className="centreblackboxparent">
        <div className="centreblackbox"></div>
      </div>

      <div className="usernameformparent">
        <div className="usernameformgrid">
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <>
              <div className="usertextparent">
                <div className="usertext">Username</div>
              </div>
              <div className="usernameEntryparent">
                <div className="usernameentry">{userData.username}</div>
              </div>

              <div className="ranktextparent">
                <div className="ranktext">Rank</div>
              </div>
              <div className="ranknameEntryparent">
                <div className="ranknameentry">{userData.rank}</div>
              </div>

              <div className="scoretextparent">
                <div className="scoretext">Score</div>
              </div>
              <div className="scorenameEntryparent">
                <div className="scorenameentry">{userData.score}</div>
              </div>
            </>
          )}
        </div>
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

      <div className="pokemonwallagridparent">
        <div className="pokemonwallagrid">
          <div className="profiletextparent">
            <div className="profiletext">Profile</div>
          </div>
          <div className="avatartextparent">
            <div className="avatartext">Avatar</div>
          </div>
          <div className="Pokemonparent">
            <img src={pokemon} alt="avatar" className="pokemon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
