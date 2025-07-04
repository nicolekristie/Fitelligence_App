import jwt from "jsonwebtoken";

// Middleware to verify JWT tokens
export const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: "Access denied. No token provided.",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request object
    next(); // Continue to next middleware/route
  } catch (err) {
    console.error("JWT verification failed:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expired. Please login again.",
      });
    }

    return res.status(403).json({
      error: "Invalid token.",
    });
  }
};

// Optional middleware for routes that can work with or without auth
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Token invalid but we don't fail the request
      console.log("Optional auth failed:", err.message);
    }
  }

  next();
};
