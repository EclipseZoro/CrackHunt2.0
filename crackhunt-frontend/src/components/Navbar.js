import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isRegistered, setShowRegister }) => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to={isRegistered ? "/games" : "#"} onClick={!isRegistered ? () => alert("Please register first!") : null}>
        Games
      </Link>
      {isRegistered ? (
        <Link to="/leaderboard">Leaderboard</Link>
      ) : (
        <button onClick={() => setShowRegister(true)}>Register</button>
      )}
    </nav>
  );
};

export default Navbar;
