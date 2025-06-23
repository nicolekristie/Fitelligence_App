import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover", // Expands to fit entire page
    backgroundAttachment: "fixed",
    opacity: 0.15, // Darker/more visible (15% instead of 5%)
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw", // Full viewport width
    height: "100vh", // Full viewport height
    zIndex: -1,
    pointerEvents: "none",
  };

  return (
    <div>
      {/* Background Logo */}
      <div style={backgroundStyle}></div>

      <Container className="mt-5" style={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 fw-bold text-primary">
              Welcome to Fitelligence
            </h1>
            <p className="lead text-muted">
              Smart fitness tracking and intelligence for your workout journey
            </p>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <i className="fas fa-dumbbell fa-3x text-primary"></i>
                </div>
                <Card.Title>AI Personalized Recipes</Card.Title>
                <Card.Text>
                  Personalized meal plans and recipes tailored to your fitness
                  goals and dietary preferences.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <i className="fas fa-chart-line fa-3x text-success"></i>
                </div>
                <Card.Title>Progress Tracking</Card.Title>
                <Card.Text>
                  Monitor your fitness progress with detailed analytics and
                  visual insights.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <i className="fas fa-brain fa-3x text-info"></i>
                </div>
                <Card.Title>AI Intelligence</Card.Title>
                <Card.Text>
                  Get personalized workout suggestions powered by artificial
                  intelligence.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row className="text-center">
          <Col>
            <Card className="bg-light">
              <Card.Body className="py-5">
                <h3 className="mb-4">Ready to Start Your Fitness Journey?</h3>
                <div className="d-flex justify-content-center gap-3">
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                    size="lg"
                    className="px-4"
                  >
                    Get Started
                  </Button>
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-primary"
                    size="lg"
                    className="px-4"
                  >
                    Login
                  </Button>
                </div>
                <p className="text-muted mt-3">
                  Join thousands of users already using Fitelligence
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
