import React from "react";
import { Navigate } from "react-router-dom";

// Protected Route Component
function ProtectedRoute({ children }) {
  // Check if user is logged in
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected component
  return children;
}

export default ProtectedRoute;
