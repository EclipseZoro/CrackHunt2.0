import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LeaderBoard from "./components/Leaderpage";
import Profile from "./components/Profile";
import Games from "./components/games";
import TicTacToe from "./games/TicTacToe/GameComponent";
import Register from "./components/Register"; 
import { AuthProvider, useAuth } from "./components/AuthContext";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/profile" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/games" element={<ProtectedRoute element={<Games />} />} />
            <Route path="/tic-tac-toe" element={<ProtectedRoute element={<TicTacToe />} />} />
            <Route path="/leaderboard" element={<ProtectedRoute element={<LeaderBoard />} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
