import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./Context/userContext.jsx";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUser();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected component
  return children;
}

export default ProtectedRoute;
