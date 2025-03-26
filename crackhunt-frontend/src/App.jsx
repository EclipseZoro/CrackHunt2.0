import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./components/HomePage";
import LeaderBoard from "./components/Leaderpage";  // Ensure correct casing
import Games from "./components/Profile";
import TicTacToe from "./games/TicTacToe/GameComponent";  
import "./App.css";

function App() {
  return (
    <Router> 
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<Games />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
