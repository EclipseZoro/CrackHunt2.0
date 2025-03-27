import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LeaderBoard from "./components/Leaderpage";
import Profile from "./components/Profile";
import Games from "./components/games";
import TicTacToe from "./games/TicTacToe/GameComponent";
import Register from "./components/Register";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; 
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/games" element={<ProtectedRoute><Games /></ProtectedRoute>} />
            <Route path="/tic-tac-toe" element={<ProtectedRoute><TicTacToe /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><LeaderBoard /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
