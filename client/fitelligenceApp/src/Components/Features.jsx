import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faChartLine,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "./Context/userContext.jsx";

function Features() {
  const { user } = useUser();

  return (
    <Container className="mt-5">
      {/* Features Header */}
      <div className="text-center mb-4">
        <h2 className="h3 text-primary mb-2">Exclusive Features</h2>
        <p className="text-muted small">
          Unlock premium features tailored to your fitness journey.
        </p>
      </div>

      {/* Features Section */}
      <Row className="mb-5 mt-3">
        <Col md={4} className="mb-2">
          <Card className="h-100 text-center shadow-sm">
            <Card.Body className="p-3">
              <div className="mb-2">
                <FontAwesomeIcon
                  icon={faDumbbell}
                  size="lg"
                  className="text-primary"
                />
              </div>
              <Card.Title className="h6 mb-2">
                AI Personalized Recipes
              </Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                Personalized meal plans and recipes tailored to your fitness
                goals and dietary preferences.
              </Card.Text>
              {user ? (
                <Button
                  as={Link}
                  to="/chat-recipe"
                  variant="primary"
                  size="sm"
                  className="mt-2"
                >
                  View Recipes
                </Button>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-primary"
                  size="sm"
                  className="mt-2"
                >
                  Login to View Recipes
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-2">
          <Card className="h-100 text-center shadow-sm">
            <Card.Body className="p-3">
              <div className="mb-2">
                <FontAwesomeIcon
                  icon={faChartLine}
                  size="lg"
                  className="text-success"
                />
              </div>
              <Card.Title className="h6 mb-2">Progress Tracking</Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                Review your previous conversations with your AI fitness coach.
                This page displays your chat history so you can revisit your
                coach's advice, feedback, and motivation as you progress on your
                fitness journey.
              </Card.Text>
              <Button
                as={Link}
                to="/progress"
                variant="success"
                size="sm"
                className="mt-2"
              >
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                View Progress
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-2">
          <Card className="h-100 text-center shadow-sm">
            <Card.Body className="p-3">
              <div className="mb-2">
                <FontAwesomeIcon
                  icon={faBrain}
                  size="lg"
                  className="text-info"
                />
              </div>
              <Card.Title className="h6 mb-2">AI Intelligence</Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                Get personalized workout suggestions powered by artificial
                intelligence.
              </Card.Text>
              {user ? (
                <Button
                  as={Link}
                  to="/chat"
                  variant="info"
                  size="sm"
                  className="mt-1"
                >
                  Chat with AI Coach
                </Button>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-info"
                  size="sm"
                  className="mt-1"
                >
                  Login to Access AI Coach
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Features;
