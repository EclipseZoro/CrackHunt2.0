import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // ✅ Parse only if valid JSON
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("loggedInUser"); // Remove corrupted data
      }
    }
  }, []);

  const login = (username) => {
    const userData = { username }; // ✅ Store as an object
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
