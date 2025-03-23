import React, { useState } from "react";
import "./Navbar.css";
import pokemonIcon from "../assets/svgs/pokemon-p2-65 1.svg";

const Navbar = () => {
  const [registered, setRegistered] = useState(false);

  return (
    <nav className="navbar">
      <img src={pokemonIcon} alt="Pokemon Icon" className="pokemon-icon" />
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Games</a></li>
        <li>
          {registered ? (
            <button className="leaderboard-btn">Leaderboard</button>
          ) : (
            <button className="register-btn" onClick={() => setRegistered(true)}>Register</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
