import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./Context/userContext.jsx";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();

  // While loading, render nothing (or a spinner if you prefer)
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #000 0%, #b31217 100%)",
          color: "#fff",
          fontSize: 32,
          fontWeight: 600,
          textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
        }}
      >
        <span
          role="img"
          aria-label="loading"
          style={{ fontSize: 48, marginRight: 16 }}
        >
          ⏳
        </span>
        Loading...
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected component
  return children;
}

export default ProtectedRoute;
