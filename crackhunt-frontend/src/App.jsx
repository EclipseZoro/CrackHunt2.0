import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LeaderBoard from "./components/Leaderpage";
import Profile from "./components/Profile";
import Games from "./components/games";
import Register from "./components/Register";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Hangman from "./components/game/1/game";
import Minesweeper from "./components/game/2/game";
import SimonSays from "./components/game/3/game";
import SlidingPuzzle from "./components/game/4/game";
import FlappyBird from "./components/game/5/game";
import PegSolitaire from "./components/game/6/game";
import LightsOut from "./components/game/7/game";
import MastermindGame from "./components/game/8/game";
import MazeGame from "./components/game/9/game";
import ReversiGame from "./components/game/10/game";
import Sudoku from "./components/game/11/game";
import WordGuessing from "./components/game/12/game";
import TowerOfHanoi from "./components/game/13/game";
import KakuroGame from "./components/game/14/game";
import TicTacToe from "./components/game/15/game";
import HexGame from "./components/game/16/game";

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
  
            <Route path="/game/1" element={<ProtectedRoute><Hangman /></ProtectedRoute>} />
            <Route path="/game/2" element={<ProtectedRoute><Minesweeper /></ProtectedRoute>} />
            <Route path="/game/3" element={<ProtectedRoute><SimonSays /></ProtectedRoute>} />
            <Route path="/game/4" element={<ProtectedRoute><SlidingPuzzle /></ProtectedRoute>} />
            <Route path="/game/5" element={<ProtectedRoute><FlappyBird /></ProtectedRoute>} />
            <Route path="/game/6" element={<ProtectedRoute><PegSolitaire /></ProtectedRoute>} />
            <Route path="/game/7" element={<ProtectedRoute><LightsOut /></ProtectedRoute>} />
            <Route path="/game/8" element={<ProtectedRoute><MastermindGame /></ProtectedRoute>} />
            <Route path="/game/9" element={<ProtectedRoute><MazeGame /></ProtectedRoute>} />
            <Route path="/game/10" element={<ProtectedRoute><ReversiGame /></ProtectedRoute>} />
            <Route path="/game/11" element={<ProtectedRoute><Sudoku /></ProtectedRoute>} />
            <Route path="/game/12" element={<ProtectedRoute><WordGuessing /></ProtectedRoute>} />
            <Route path="/game/13" element={<ProtectedRoute><TowerOfHanoi /></ProtectedRoute>} />
            <Route path="/game/14" element={<ProtectedRoute><KakuroGame /></ProtectedRoute>} />
            <Route path="/game/15" element={<ProtectedRoute><TicTacToe /></ProtectedRoute>} />
            <Route path="/game/16" element={<ProtectedRoute><HexGame /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><LeaderBoard /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
