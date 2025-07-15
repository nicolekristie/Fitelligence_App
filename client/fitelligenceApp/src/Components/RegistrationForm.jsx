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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./Context/userContext.jsx";

// Custom CSS to ensure labels are left-aligned
const labelStyle = {
  textAlign: "left",
  display: "block",
  width: "100%",
};

function RegistrationForm() {
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setIsError(true);
      return;
    }

    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters!");
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Send data to backend
      const response = await axios.post("/api/register", {
        firstname: formData.firstName,
        lastname: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Registration successful - auto-login the user
      const { token, user } = response.data;

      // Store token in localStorage (for API authentication)
      localStorage.setItem("token", token);

      // Set user in context only (no localStorage for user data)
      loginUser(user);

      // Success message
      setMessage("Registration successful! Welcome to Fitelligence!");
      setIsError(false);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to fitness survey after showing success message
      setTimeout(() => {
        navigate("/fitness-survey");
      }, 2000); // 2 second delay to show success message
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.error || "Registration failed. Please try again.";
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
              Register
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
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label style={labelStyle}>FirstName</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label style={labelStyle}>LastName</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label style={labelStyle}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={labelStyle}>Email address</Form.Label>
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
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label style={labelStyle}>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Register"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationForm;
