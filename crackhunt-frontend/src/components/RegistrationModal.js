import React, { useState } from "react";

const RegistrationModal = ({ setIsRegistered, setShowRegister }) => {
  const [username, setUsername] = useState("");

  const handleRegister = () => {
    if (username.trim()) {
      setIsRegistered(true);
      setShowRegister(false);
    } else {
      alert("Please enter a username!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Register</h2>
        <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={handleRegister}>Submit</button>
        <button onClick={() => setShowRegister(false)}>Close</button>
      </div>
    </div>
  );
};

export default RegistrationModal;
