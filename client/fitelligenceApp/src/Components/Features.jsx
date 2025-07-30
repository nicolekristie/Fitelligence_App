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
const recipeIcon = "/assets/images/profile/avatardefault.jpg";

const onRecipeClick = () => {
  window.location.href = "/chat-recipe";
};
function Features() {
  return (
    <Container className="py-4">
      <style>{`
        .glow-btn {
          transition: all 0.18s cubic-bezier(.4,0,.2,1);
        }
        .glow-btn:hover, .glow-btn:focus {
          background: linear-gradient(90deg, #ff2a2a 0%, #b31217 100%);
          box-shadow: 0 0 16px 2px #ff2a2a99, 0 2px 8px #b31217;
          transform: scale(1.06);
          color: #fff;
          border: none;
          outline: none;
        }
      `}</style>
      <Row>
        <Col xs={12} className="mb-4">
          <h2
            // No animation class
            style={{
              color: "#f3eaea",
              fontWeight: 900,
              fontSize: "2.8rem",
              textAlign: "center",
              textShadow: "0 0 4px #b31217, 0 2px 8px #ff2a2a, 0 4px 16px #000",
              letterSpacing: 2,
              marginBottom: 0,
              WebkitTextStroke: "0.5px #b31217",
            }}
          >
            Welcome to Fitelligence
          </h2>
        </Col>
        <Col md={4} className="mb-2">
          <Card
            className="h-100 text-center shadow-sm"
            style={{
              background: "rgba(0,0,0,0.92)",
              border: "2px solid #b31217",
              borderRadius: 22,
              boxShadow: "0 4px 24px 0 #b3121744",
              color: "#ff2a2a",
            }}
          >
            <Card.Body>
              <FontAwesomeIcon
                icon={faDumbbell}
                size="2x"
                className="mb-2 text-primary"
              />
              <Card.Title
                className="h6 mb-2"
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
                }}
              >
                AI Personalized Recipes
              </Card.Title>
              {/* <img
                src={recipeIcon}
                alt="AI Recipes"
                style={{
                  width: 38,
                  height: 38,
                  marginBottom: 12,
                  borderRadius: 12,
                }} */}
              {/* /> */}
              <Card.Text
                style={{
                  fontSize: "1rem",
                  color: "#fff",
                  fontWeight: 500,
                  textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
                }}
              >
                Personalized meal plans and recipes tailored to your fitness
                goals and dietary preferences.
              </Card.Text>
              <Button
                // className="btn btn-primary w-100 mt-2"
                onClick={onRecipeClick}
                variant="danger"
                className="glow-btn"
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "6px 18px",
                  background:
                    "linear-gradient(90deg, #b31217 0%, #ff2a2a 100%)",
                  border: "none",
                }}
              >
                Explore Recipes
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-2">
          <Card
            className="h-100 text-center shadow-sm"
            style={{
              background: "rgba(0,0,0,0.92)",
              border: "2px solid #b31217",
              borderRadius: 22,
              boxShadow: "0 4px 24px 0 #b3121744",
              color: "#ff2a2a",
            }}
          >
            <Card.Body>
              <FontAwesomeIcon
                icon={faChartLine}
                size="2x"
                className="mb-2 text-success"
              />
              <Card.Title
                className="h6 mb-2"
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
                }}
              >
                Progress Tracking
              </Card.Title>
              <Card.Text
                style={{
                  fontSize: "1rem",
                  color: "#fff",
                  fontWeight: 500,
                  textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
                }}
              >
                Review your previous conversations with your AI fitness coach.
                This page displays your chat history so you can revisit your
                coach's advice, feedback, and motivation as you progress on your
                fitness journey.
              </Card.Text>
              <Button
                as={Link}
                to="/progress"
                // className="btn btn-success w-100 mt-2"
                className="glow-btn"
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "6px 18px",
                  background:
                    "linear-gradient(90deg, #b31217 0%, #ff2a2a 100%)",
                  border: "none",
                }}
              >
                View Progress
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-2">
          <Card
            className="h-100 text-center shadow-sm"
            style={{
              background: "rgba(0,0,0,0.92)",
              border: "2px solid #b31217",
              borderRadius: 22,
              boxShadow: "0 4px 24px 0 #b3121744",
              color: "#ff2a2a",
            }}
          >
            <Card.Body>
              <FontAwesomeIcon
                icon={faBrain}
                size="2x"
                className="mb-2 text-info"
              />
              <Card.Title
                className="h6 mb-2"
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
                }}
              >
                AI Intelligence
              </Card.Title>
              <Card.Text
                style={{
                  fontSize: "1rem",
                  color: "#fff",
                  fontWeight: 500,
                  textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
                }}
              >
                Get personalized workout suggestions powered by artificial
                intelligence.
              </Card.Text>
              <Button
                as={Link}
                to="/ai-intelligence"
                // className="btn btn-info w-100 mt-2"
                className="glow-btn"
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "6px 18px",
                  background:
                    "linear-gradient(90deg, #b31217 0%, #ff2a2a 100%)",
                  border: "none",
                }}
              >
                Chat with AI Coach
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Features;
