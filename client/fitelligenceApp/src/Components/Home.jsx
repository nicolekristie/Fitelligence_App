import couple1 from "../assets/images/Home/couple1.webp";
import couple2 from "../assets/images/Home/couple2.webp";
import couple6 from "../assets/images/Home/couple6.jpg";
import {
  faDumbbell,
  faChartLine,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "./Context/userContext.jsx";

function Home() {
  const { user, isLoading } = useUser();
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Hero Section at the top */}
      <Container className="pt-5 pb-2 text-center">
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
            <h1
              className="display-4 fw-bold gradient-heading"
              style={{
                background:
                  "linear-gradient(90deg, #1b6b6b 0%, #17c3b2 40%, #00e6ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                textShadow:
                  "0 4px 16px rgba(23,195,178,0.18), 0 2px 8px #14696a",
              }}
            >
              Welcome to Fitelligence
            </h1>
            <p className="lead text-muted">
              Your intelligent fitness companion for smarter workouts and better
              results
            </p>
          </>
        )}
      </Container>
      {/* Centered images row above the feature cards */}
      <div className="home-image-row">
        {/* Motivational overlays and hover effects handled in CSS */}
        <div className="home-img-container">
          <img src={couple1} alt="Couple 1" className="home-img-hover" />
          <div className="img-overlay">
            <span className="img-quote">"Stronger Together"</span>
          </div>
        </div>
        <div className="home-img-container">
          <img src={couple2} alt="Couple 2" className="home-img-hover" />
          <div className="img-overlay">
            <span className="img-quote">"Every Day is Progress"</span>
          </div>
        </div>
        <div className="home-img-container">
          <img src={couple6} alt="Couple 6" className="home-img-hover" />
          <div className="img-overlay">
            <span className="img-quote">"You Got This!"</span>
          </div>
        </div>
      </div>
      {/* Smaller three-column feature cards under images */}
      <Container className="mb-3" style={{ maxWidth: 1100 }}>
        <Row className="justify-content-center g-4">
          <Col xs={12} md={6} lg={4} className="d-flex">
            <Card
              className="flex-fill text-center shadow-sm"
              style={{
                maxWidth: 380,
                margin: "0 auto",
                borderRadius: 22,
                padding: 0,
              }}
            >
              <Card.Body style={{ padding: 32 }}>
                <span
                  className="plan-icon"
                  style={{ fontSize: 32, marginBottom: 8, display: "block" }}
                >
                  <FontAwesomeIcon icon={faDumbbell} />
                </span>
                <Card.Title
                  style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}
                >
                  AI Personalized Recipes
                </Card.Title>
                <Card.Text style={{ fontSize: 15, marginBottom: 12 }}>
                  Personalized meal plans and recipes tailored to your fitness
                  goals and dietary preferences.
                </Card.Text>
                {user ? (
                  <Button
                    as={Link}
                    to="/chat-recipe"
                    variant="primary"
                    className="glow-btn"
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      padding: "6px 18px",
                    }}
                  >
                    View Recipes
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-primary"
                    className="glow-btn"
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      padding: "6px 18px",
                    }}
                  >
                    Login to View Recipes
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="d-flex">
            <Card
              className="flex-fill text-center shadow-sm"
              style={{
                maxWidth: 380,
                margin: "0 auto",
                borderRadius: 22,
                padding: 0,
              }}
            >
              <Card.Body style={{ padding: 32 }}>
                <span
                  className="plan-icon"
                  style={{ fontSize: 32, marginBottom: 8, display: "block" }}
                >
                  <FontAwesomeIcon icon={faChartLine} />
                </span>
                <Card.Title
                  style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}
                >
                  Progress Tracking
                </Card.Title>
                <Card.Text style={{ fontSize: 15, marginBottom: 12 }}>
                  Review your previous conversations with your AI fitness coach.
                  This page displays your chat history so you can revisit your
                  coach's advice, feedback, and motivation as you progress on
                  your fitness journey.
                </Card.Text>
                <Button
                  variant="success"
                  as={Link}
                  to="/progress"
                  // Removed glow-btn for no glow effect
                  className=""
                  style={{ fontWeight: 600, fontSize: 15, padding: "6px 18px" }}
                >
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />
                  View Progress
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="d-flex">
            <Card
              className="flex-fill text-center shadow-sm"
              style={{
                maxWidth: 380,
                margin: "0 auto",
                borderRadius: 22,
                padding: 0,
              }}
            >
              <Card.Body style={{ padding: 32 }}>
                <span
                  className="plan-icon"
                  style={{ fontSize: 32, marginBottom: 8, display: "block" }}
                >
                  <FontAwesomeIcon icon={faBrain} />
                </span>
                <Card.Title
                  style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}
                >
                  AI Intelligence
                </Card.Title>
                <Card.Text style={{ fontSize: 15, marginBottom: 12 }}>
                  Get personalized workout suggestions powered by artificial
                  intelligence.
                </Card.Text>
                {user ? (
                  <Button
                    as={Link}
                    to="/chat"
                    variant="info"
                    // Removed glow-btn for no glow effect
                    className=""
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      padding: "6px 18px",
                    }}
                  >
                    Chat with AI Coach
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-info"
                    className="glow-btn"
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      padding: "6px 18px",
                    }}
                  >
                    Login to Access AI Coach
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Main Home content below images */}
      <Container className="mt-2" style={{ position: "relative", zIndex: 1 }}>
        {/* No banner, no animation styles */}
        <style>{`
        .scroll-banner-container {
          width: 100vw;
          overflow: hidden;
          height: 90px;
          margin-bottom: 16px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .scroll-banner-text.big-bold-banner {
          display: inline-block;
          white-space: nowrap;
          font-size: 3.2rem;
          font-weight: 900;
          color: #1b6b6b;
          font-family: 'Montserrat', 'Arial', sans-serif;
          letter-spacing: 2px;
          text-align: center;
        }
        .scroll-banner-text.scroll-horizontal {
          position: absolute;
          left: 100vw;
          animation: scroll-flip-then-scroll 9s linear forwards;
        }
        @keyframes scroll-flip-then-scroll {
          0% {
            left: 50vw;
            opacity: 0.2;
            transform: rotateY(0deg);
          }
          10% {
            opacity: 1;
            left: 50vw;
            transform: rotateY(360deg);
          }
          20% {
            left: 50vw;
            transform: rotateY(720deg);
          }
          25% {
            left: 50vw;
            transform: rotateY(720deg);
          }
          30% {
            left: 100vw;
            transform: rotateY(720deg);
          }
          90% {
            left: -120vw;
            transform: rotateY(720deg);
          }
          100% {
            left: -120vw;
            opacity: 0.2;
            transform: rotateY(720deg);
          }
        }
        .blink {
          animation: blink-text 1.2s step-end 3 alternate;
        }
        @keyframes blink-text {
          0% { opacity: 1; }
          50% { opacity: 0.1; }
          100% { opacity: 1; }
        }
        .flip {
          backface-visibility: hidden;
          perspective: 800px;
        }
        /* Stronger glowing button effect */
        .glow-btn {
          position: relative;
          z-index: 1;
          box-shadow: 0 0 12px 2px #00e6ff, 0 0 32px 8px #00e6ff66;
          border: none !important;
          background: linear-gradient(90deg, #00e6ff 0%, #1b6b6b 100%) !important;
          color: #fff !important;
          font-weight: 700;
          transition: box-shadow 0.3s, background 0.3s, color 0.3s;
        }
        .glow-btn:hover, .glow-btn:focus {
          box-shadow: 0 0 24px 6px #00e6ff, 0 0 48px 16px #00e6ff99;
          background: linear-gradient(90deg, #1b6b6b 0%, #00e6ff 100%) !important;
          color: #fff !important;
        }
        .home-image-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 64px;
          margin: 48px 0 64px 0;
          width: 100%;
        }
        .home-img-container {
          position: relative;
          width: min(32vw, 340px);
          height: min(32vw, 340px);
          border-radius: 32px;
          overflow: hidden;
          background: #eafcff;
          box-shadow: 0 10px 40px 0 rgba(0,0,0,0.22);
          border: 4px solid #fff;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .home-img-hover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 32px;
          transition: transform 0.35s cubic-bezier(.4,0,.2,1), filter 0.35s cubic-bezier(.4,0,.2,1);
          display: block;
        }
        .home-img-contain {
          object-fit: contain !important;
          background: linear-gradient(180deg, #eafcff 60%, #fff 100%);
        }
        .home-img-container:hover .home-img-hover,
        .home-img-container:focus-within .home-img-hover {
          transform: scale(1.07);
          filter: brightness(1.08) saturate(1.1);
        }
        .home-img-container:hover,
        .home-img-container:focus-within {
          box-shadow: 0 16px 48px 0 #00e6ff55, 0 0 0 4px #00e6ffcc;
          border-color: #00e6ff;
        }
        .img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 100%);
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .home-img-container:hover .img-overlay,
        .home-img-container:focus-within .img-overlay {
          opacity: 1;
        }
        .img-quote {
          color: #fff;
          font-size: 1.25rem;
          font-weight: 700;
          text-shadow: 0 2px 12px #000, 0 0 8px #00e6ff;
          background: rgba(0,0,0,0.18);
          border-radius: 16px;
          padding: 8px 18px;
          letter-spacing: 1px;
        }
        .animated-welcome {
          opacity: 0;
          transform: translateY(-30px) scale(0.98);
          transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
        }
        .animated-welcome.fade-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .animated-card {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
        }
        .animated-card.card-fade-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      /* Mobile styles for larger, square images */
      @media (max-width: 600px) {
        .home-image-row {
          gap: 16px;
        }
        .home-img-container {
          width: 90vw;
          height: 90vw;
          max-width: 340px;
          max-height: 340px;
          border-radius: 18px;
        }
        .home-img-hover {
          border-radius: 18px;
        }
      }
      `}</style>
        {/* ...rest of Home content (features, CTA) remains unchanged... */}
        {/* Call to Action - restored, compact but more prominent */}
        <Row className="text-center mb-4">
          <Col>
            <Card
              className="bg-light"
              style={{
                minHeight: 0,
                maxWidth: 1100,
                width: "100%",
                margin: "0 auto",
                borderRadius: 18,
              }}
            >
              <Card.Body
                className="py-0"
                style={{ paddingTop: 0, paddingBottom: 0 }}
              >
                {user ? (
                  <>
                    <h5
                      className="mb-1"
                      style={{ fontSize: 18, marginBottom: 4 }}
                    >
                      Ready to Continue, {user.firstname}?
                    </h5>
                    <div className="d-flex justify-content-center gap-2 mb-1">
                      <Button
                        as={Link}
                        to="/progress"
                        variant="primary"
                        size="sm"
                        className="px-2"
                        style={{ boxShadow: "none" }}
                      >
                        View Progress
                      </Button>
                      <Button
                        as={Link}
                        to="/profile"
                        variant="outline-primary"
                        size="sm"
                        className="px-2"
                        style={{ boxShadow: "none" }}
                      >
                        My Profile
                      </Button>
                    </div>
                    <p
                      className="text-muted mt-1 mb-0"
                      style={{ fontSize: 13 }}
                    >
                      Welcome back! Let's achieve your fitness goals together.
                    </p>
                  </>
                ) : (
                  <>
                    <h5
                      className="mb-1"
                      style={{ fontSize: 18, marginBottom: 4 }}
                    >
                      Ready to Start?
                    </h5>
                    <div className="d-flex justify-content-center gap-2 mb-1">
                      <Button
                        as={Link}
                        to="/register"
                        variant="primary"
                        size="sm"
                        className="px-2"
                      >
                        Get Started
                      </Button>
                      <Button
                        as={Link}
                        to="/login"
                        variant="outline-primary"
                        size="sm"
                        className="px-2"
                      >
                        Login
                      </Button>
                    </div>
                    <p
                      className="text-muted mt-1 mb-0"
                      style={{ fontSize: 13 }}
                    >
                      Join thousands of users already using Fitelligence
                    </p>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Add bottom padding for space below the CTA section */}
        <div style={{ paddingBottom: 48 }} />
      </Container>
      {/* Animation styles */}
      <style>{`
        .animated-welcome {
          opacity: 0;
          transform: translateY(-30px) scale(0.98);
          transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
        }
        .animated-welcome.fade-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .animated-card {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
        }
        .animated-card.card-fade-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>
    </div>
  );
}

export default Home;
