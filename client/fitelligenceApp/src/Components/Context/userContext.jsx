import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true

  // Initialize user state by validating token on app start
  useEffect(() => {
    // Clean up any old user data from localStorage (from previous implementation)
    localStorage.removeItem("user");

    const token = localStorage.getItem("token");

    if (token) {
      // Validate token with backend and get fresh user data
      const validateToken = async () => {
        try {
          const response = await fetch("http://localhost:3001/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error validating token:", error);
          localStorage.removeItem("token");
        } finally {
          setIsLoading(false);
        }
      };

      validateToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Function to login user
  const loginUser = (userData) => {
    setUser(userData);
    setIsLoading(false); // Ensure loading is set to false after login
  };

  // Function to logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Function to manually validate current token (useful for testing)
  const validateCurrentToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("UserContext: No token to validate");
      return false;
    }

    try {
      const response = await fetch("http://localhost:3001/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("UserContext: Token validation successful:", data);
        setUser(data.user);
        return true;
      } else {
        console.log("UserContext: Token validation failed");
        localStorage.removeItem("token");
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error("UserContext: Error during token validation:", error);
      localStorage.removeItem("token");
      setUser(null);
      return false;
    }
  };

  const value = {
    user,
    setUser,
    loginUser,
    logoutUser,
    validateCurrentToken,
    isLoading,
    setIsLoading,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
