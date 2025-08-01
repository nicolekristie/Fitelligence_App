import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useUser } from "./Context/userContext.jsx";

// Custom CSS to ensure labels are left-aligned
const labelStyle = {
  textAlign: "left",
  display: "block",
  width: "100%",
};

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, isAuthenticated, isLoading } = useUser();
  // If already authenticated and on the login page, redirect to previous or home
  if (!isLoading && isAuthenticated && location.pathname === "/login") {
    // Try to redirect to previous page if available, else home
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
    return null;
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsFormLoading(true);
    setMessage("");

    try {
      // Send login request to backend
      const response = await axios.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      // Login successful
      const { token } = response.data;

      // Store token in localStorage (for API authentication)
      localStorage.setItem("token", token);

      // Fetch full user profile (with avatar_url) and set in context
      try {
        const profileRes = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (profileRes.data && profileRes.data.user) {
          loginUser(profileRes.data.user);
        }
      } catch (profileErr) {
        // fallback: clear user context if profile fetch fails
        loginUser(null);
      }

      setMessage("Login successful! Welcome back!");
      setIsError(false);

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect to Welcome page after showing success message
      setTimeout(() => {
        navigate("/welcome");
      }, 1500);
    } catch (error) {
      // Handle login errors
      const errorMessage =
        error.response?.data?.error || "Login failed. Please try again.";
      setMessage(errorMessage);
      setIsError(true);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card
            style={{
              background: "linear-gradient(135deg, #232323 0%, #b31217 100%)",
              color: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 18px rgba(179,18,23,0.18)",
              border: "2px solid #b31217",
              backdropFilter: "blur(2px)", // optional for a frosted effect
            }}
          >
            <Card.Header
              as="h3"
              className="text-center"
              style={{
                background: "transparent",
                color: "#fff",
                border: "none",
              }}
            >
              Login
            </Card.Header>
            <Card.Body
              className="text-start"
              style={{
                background: "linear-gradient(135deg, #232323 0%, #b31217 100%)",
                color: "#fff",
                borderRadius: "0 0 18px 18px",
              }}
            >
              {message && (
                <Alert
                  variant={isError ? "danger" : "success"}
                  className="mb-3"
                >
                  {message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={labelStyle}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={labelStyle}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                </Form.Group>

                <Button
                  // variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={isFormLoading}
                  style={{
                    background:
                      "linear-gradient(90deg, #232323 0%, #b31217 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: 10,
                    border: "2px solid #eafcff", // lighter border for contrast
                    boxShadow: "0 0 12px #b31217",
                    letterSpacing: "0.2px",
                  }}
                >
                  {isFormLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center mt-3">
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1.08rem",
                      letterSpacing: "0.2px",
                      textShadow: "0 1px 4px #b31217",
                    }}
                  >
                    Don't have an account?{" "}
                  </span>
                  <Link
                    to="/register"
                    className="text-decoration-underline"
                    style={{
                      color: "#ff2a2a",
                      fontWeight: 700,
                      letterSpacing: "0.2px",
                      fontSize: "1.08rem",
                      textShadow: `
                        0 2px 8px #000,
                        0 1px 6px #b31217,
                        0 0 2px #000,
                        0 0 6px #000
                      `,
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#fff")}
                    onMouseOut={(e) => (e.target.style.color = "#ff2a2a")}
                  >
                    Register here
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
