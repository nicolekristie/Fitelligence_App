import React from "react";
import { Container } from "react-bootstrap";
import { useUser } from "./Context/userContext.jsx";
import HeroSlider from "./HeroSlider.jsx";
import Features from "./Features.jsx";

function Welcome() {
  const { user } = useUser();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000 0%, #b31217 100%)",
        backgroundAttachment: "fixed",
        backgroundImage: "none",
      }}
    >
      <Container className="text-center mb-4 mt-4">
        <h1
          className="display-4 fw-bold"
          style={{
            color: "#fff",
            textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
            fontWeight: 700,
          }}
        >
          {`Welcome back, ${
            user && user.firstname ? user.firstname : "Friend"
          }! `}
          <span role="img" aria-label="flex">
            💪
          </span>
        </h1>
        <p className="lead text-secondary">
          <p
            className="lead"
            style={{ color: "#fff", textShadow: "0 2px 8px #000" }}
          >
            Ready to continue your fitness journey?
          </p>
        </p>
      </Container>

      <HeroSlider />

      <div className="mb-5">
        <Features />
      </div>
      <div style={{ height: "48px" }} />
    </div>
  );
}

export default Welcome;
