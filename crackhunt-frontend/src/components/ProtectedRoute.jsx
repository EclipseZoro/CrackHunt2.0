import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log("ProtectedRoute user:", user);  
  return user ? children : <Navigate to="/profile" />;
};

export default ProtectedRoute;
