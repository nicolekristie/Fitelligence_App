import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faChartLine,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo.png";
import { useUser } from "./Context/userContext.jsx";

function Home() {
  const { user, isLoading } = useUser();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Container className="mt-5" style={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <Row className="text-center mb-5">
          <Col>
            {user ? (
              <>
                <h1 className="display-4 fw-bold text-primary">
                  Welcome back, {user.firstname}! 💪
                </h1>
                <p className="lead text-muted">
                  Ready to continue your fitness journey?
                </p>
              </>
            ) : (
              <>
                <h1 className="display-4 fw-bold text-primary">
                  Welcome to Fitelligence
                </h1>
                <p className="lead text-muted">
                  Your intelligent fitness companion for smarter workouts and
                  better results
                </p>
              </>
            )}
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faDumbbell}
                    size="3x"
                    className="text-primary"
                  />
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
                  <FontAwesomeIcon
                    icon={faChartLine}
                    size="3x"
                    className="text-success"
                  />
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
                  <FontAwesomeIcon
                    icon={faBrain}
                    size="3x"
                    className="text-info"
                  />
                </div>
                <Card.Title>AI Intelligence</Card.Title>
                <Card.Text>
                  Get personalized workout suggestions powered by artificial
                  intelligence.
                </Card.Text>
                {user ? (
                  <Button as={Link} to="/chat" variant="info" className="mt-3">
                    Chat with AI Coach
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-info"
                    className="mt-3"
                  >
                    Login to Access AI Coach
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row className="text-center">
          <Col>
            <Card className="bg-light">
              <Card.Body className="py-3">
                {user ? (
                  // User is logged in - show personalized call-to-action
                  <>
                    <h5 className="mb-3">
                      Ready to Continue, {user.firstname}?
                    </h5>
                    <div className="d-flex justify-content-center gap-3">
                      <Button
                        as={Link}
                        to="/workouts"
                        variant="primary"
                        size="md"
                        className="px-3"
                      >
                        View Workouts
                      </Button>
                      <Button
                        as={Link}
                        to="/profile"
                        variant="outline-primary"
                        size="md"
                        className="px-3"
                      >
                        My Profile
                      </Button>
                    </div>
                    <p className="text-muted mt-2 mb-0">
                      Welcome back! Let's achieve your fitness goals together.
                    </p>
                  </>
                ) : (
                  // User not logged in - show registration call-to-action
                  <>
                    <h5 className="mb-3">
                      Ready to Start Your Fitness Journey?
                    </h5>
                    <div className="d-flex justify-content-center gap-3">
                      <Button
                        as={Link}
                        to="/register"
                        variant="primary"
                        size="md"
                        className="px-3"
                      >
                        Get Started
                      </Button>
                      <Button
                        as={Link}
                        to="/login"
                        variant="outline-primary"
                        size="md"
                        className="px-3"
                      >
                        Login
                      </Button>
                    </div>
                    <p className="text-muted mt-2 mb-0">
                      Join thousands of users already using Fitelligence
                    </p>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
