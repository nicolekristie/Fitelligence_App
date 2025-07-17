import React from "react";
import { Container } from "react-bootstrap";
import { useUser } from "./Context/userContext.jsx";
import HeroSlider from "./HeroSlider.jsx";
import Features from "./Features.jsx";

function Welcome() {
  const { user } = useUser();

  return (
    <>
      <Container className="text-center mb-4 mt-4">
        <h1 className="display-4 fw-bold text-primary">
          Welcome, {user?.firstname}! 💪
        </h1>
        <p className="lead text-secondary">
          We're glad to have you here. Let's get started on your fitness
          journey!
        </p>
      </Container>

      <HeroSlider />

      <div className="mb-5">
        <Features />
      </div>
      <div style={{ height: "48px" }} />
    </>
  );
}

export default Welcome;
