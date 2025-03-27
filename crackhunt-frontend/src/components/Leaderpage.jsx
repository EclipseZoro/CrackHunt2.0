import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [leaderboard, setLeaderboard] = useState([]); // Always an array
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/leaderboard/")
      .then(response => {
        const data = response.data;
  
        // Ensure top_players is always an array (even if empty)
        setLeaderboard(Array.isArray(data.top_players) ? data.top_players : []);
  
        // Handle user rank
        setUserRank(data.user_rank || null);
  
        setLoading(false);
      })
      .catch(error => {
        console.error("API Error:", error.response?.data || error.message);
        setError(error.response?.data?.detail || "Failed to load leaderboard");
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
      <div className="boardparent">
        <img src={board} alt="board" className="board" />
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="leaderboard-text">
            {leaderboard.length > 0 ? (
              leaderboard.slice(0, 5).map((player, index) => (
                <p key={index} className={`rank-${index + 1}`}>
                  {index + 1}. {player.username} - {player.score} points
                </p>
              ))
            ) : (
              <p className="no-data">No leaderboard data available</p>
            )}
            {userRank ? (
              <p className="user-rank">
                Your Rank: {userRank.rank ?? "N/A"} - {userRank.score ?? 0} points
              </p>
            ) : (
              <p className="no-rank">No rank data available</p>
            )}
          </div>
        )}
      </div>
      <div className="ghost1parent">
        <img src={ghost1} alt="ghost1" className="ghost1" />
      </div>
      <div className="ghost2parent">
        <img src={ghost2} alt="ghost2" className="ghost2" />
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
    </div>
  );
};

export default LeaderBoard;
