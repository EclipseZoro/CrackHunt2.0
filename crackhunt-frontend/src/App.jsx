import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  return (
    <Router> {/* Wrap everything inside Router */}
      <div className="app">
        <HomePage />
      </div>
    </Router>
  );
}

export default App;
