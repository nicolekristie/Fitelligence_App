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
import { Link, useNavigate } from "react-router-dom";
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
  const { loginUser } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage("");

    try {
      // Send login request to backend
      const response = await axios.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      // Login successful
      const { token, user } = response.data;

      // Store token in localStorage (for API authentication)
      localStorage.setItem("token", token);

      // Set user in context only (no localStorage for user data)
      loginUser(user);

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
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h3" className="text-center">
              Login
            </Card.Header>
            <Card.Body className="text-start">
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
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center mt-3">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/register" className="text-decoration-none">
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
