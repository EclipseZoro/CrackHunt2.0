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
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format time
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      
      try {
        // First try the main leaderboard endpoint
        const leaderboardResponse = await axios.get("http://127.0.0.1:8000/api/leaderboard/", {
          headers: token ? {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          } : {
            'Content-Type': 'application/json',
          }
        });

        // Set the leaderboard data
        setLeaderboard(leaderboardResponse.data.top_players || []);
        setUserStatus(leaderboardResponse.data.user_status || 'unknown');
        
        // If user rank is provided, use it
        if (leaderboardResponse.data.user_rank) {
          setUserRank(leaderboardResponse.data.user_rank);
        } 
        // If user is authenticated but no rank, try the specific endpoint
        else if (token && leaderboardResponse.data.user_status === 'authenticated') {
          try {
            const userRankResponse = await axios.get("http://127.0.0.1:8000/api/leaderboard/user-rank/", {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            });
            setUserRank(userRankResponse.data);
          } catch (rankError) {
            console.error("User rank error:", rankError.response?.data || rankError.message);
            if (rankError.response?.status === 401) {
              setUserStatus('token_expired');
              localStorage.removeItem('access_token');
            }
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          setUserStatus('token_expired');
          setError("Session expired. Please login again.");
          localStorage.removeItem('access_token');
        } else {
          setError(error.response?.data?.detail || "Failed to load leaderboard");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get user rank message based on status
  const getUserRankMessage = () => {
    if (!localStorage.getItem('access_token')) {
      return "Login to view your rank";
    }
    
    switch (userStatus) {
      case 'not_authenticated':
        return "Please login again to view your rank";
      case 'no_leaderboard_entry':
        return "Play a game to get on the leaderboard!";
      case 'token_expired':
        return "Your session expired. Please login again.";
      default:
        return "Couldn't retrieve your rank";
    }
  };
  
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
          <p className="loading-text">Loading leaderboard...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="leaderboard-text">
            <h2 className="leaderboard-title">Top Players</h2>
            {leaderboard.length > 0 ? (
              leaderboard.map((player, index) => (
                <p key={index} className={`rank-${index + 1}`}>
                  {index + 1}. {player.username} - {player.score} points
                  {player.total_time ? ` - ${formatTime(player.total_time)}` : ''}
                </p>
              ))
            ) : (
              <p className="no-data">No leaderboard data available</p>
            )}
            
            <div className="user-rank-section">
              {userRank ? (
                <p className="user-rank">
                  Your Rank: {userRank.rank} / {userRank.total_players || '?'} - 
                  Score: {userRank.score} - 
                  Time: {formatTime(userRank.total_time)}
                </p>
              ) : (
                <p className="no-rank">
                  {getUserRankMessage()}
                </p>
              )}
            </div>
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