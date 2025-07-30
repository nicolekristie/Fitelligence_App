import React from "react";
import { useUser } from "./Context/userContext.jsx";
import { Carousel } from "react-bootstrap";

// Import carousel images
import beStronger from "../assets/images/carousel/Be Stronger.jpeg";
import workForIt from "../assets/images/carousel/WorkForIt.jpeg";
import fearNoLimit from "../assets/images/carousel/fearNoLimit.jpg";
import fitnessrope from "../assets/images/carousel/fitnessrope.jpg";
import goodDay from "../assets/images/carousel/goodDay.jpeg";
import neverGiveUp from "../assets/images/carousel/neverGiveUp.jpeg";
import stayStrong from "../assets/images/carousel/stayStrong.jpeg";
import weights from "../assets/images/carousel/weights.jpg";
import together from "../assets/images/carousel/together.jpg";
import fitnesswomen from "../assets/images/carousel/fitnesswomen.jpg";

function HeroSlider() {
  const { user } = useUser();

  // Responsive height: 50vw (max 400px, min 220px)
  const carouselHeight = "min(max(50vw, 220px), 400px)";
  const gradientBg = "linear-gradient(135deg, #000 0%, #b31217 100%)";
  return (
    <div className="container-fluid p-0">
      {/* Add a border and shadow to the carousel container for visual separation */}
      <div
        className="hero-slider-carousel"
        style={{
          border: "3px solid #b31217",
          borderRadius: "28px",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.38)",
          background: "rgba(0,0,0,0.18)",
          padding: "18px 0",
          margin: "0 auto 32px auto",
          maxWidth: "900px",
          position: "relative",
          zIndex: 100,
        }}
      >
        <Carousel
          interval={3000}
          controls={true}
          indicators={false}
          style={{ width: "100%", height: "auto", margin: "0" }}
        >
          {/* Fitness Journey */}
          <Carousel.Item
            style={{
              height: carouselHeight,
              position: "relative",
              background: gradientBg,
            }}
          >
            <img
              src={fitnessrope}
              alt="Fitness Journey"
              style={{
                width: "100%",
                height: carouselHeight,
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                background: "transparent",
              }}
            />
            <Carousel.Caption
              className="d-none d-md-block"
              style={{ zIndex: 2 }}
            >
              <h5
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                Fitness Journey
              </h5>
              <p
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                Start your transformation today.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Strength Training */}
          <Carousel.Item
            style={{
              height: carouselHeight,
              position: "relative",
              background: gradientBg,
            }}
          >
            <img
              src={weights}
              alt="Strength Training"
              style={{
                width: "100%",
                height: carouselHeight,
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                background: "transparent",
              }}
            />
            <Carousel.Caption
              className="d-none d-md-block"
              style={{ zIndex: 2 }}
            >
              <h5
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                Strength Training
              </h5>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #14696a" }}>
                Build your power, one rep at a time.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Be Stronger */}
          <Carousel.Item
            style={{
              height: carouselHeight,
              position: "relative",
              background: gradientBg,
            }}
          >
            <img
              src={beStronger}
              alt="Be Stronger"
              style={{
                width: "100%",
                height: carouselHeight,
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                background: "transparent",
              }}
            />
            <Carousel.Caption
              className="d-none d-md-block"
              style={{ zIndex: 2 }}
            >
              <h5
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                Be Stronger
              </h5>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #14696a" }}>
                Than your excuses.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Never Give Up */}
          <Carousel.Item
            style={{
              height: carouselHeight,
              position: "relative",
              background: gradientBg,
            }}
          >
            <img
              src={neverGiveUp}
              alt="Never Give Up"
              style={{
                width: "100%",
                height: carouselHeight,
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                background: "transparent",
              }}
            />
            <Carousel.Caption
              className="d-none d-md-block"
              style={{ zIndex: 2 }}
            >
              <h5
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                Never Give Up
              </h5>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #14696a" }}>
                Keep pushing forward.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Stay Strong */}
          <Carousel.Item
            style={{ height: carouselHeight, position: "relative" }}
          >
            <img
              src={stayStrong}
              alt="Stay Strong"
              style={{
                width: "100%",
                height: carouselHeight,
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                background: gradientBg,
              }}
            />
            <Carousel.Caption
              className="d-none d-md-block"
              style={{ zIndex: 2 }}
            >
              <h5
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                Stay Strong
              </h5>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #14696a" }}>
                Build your inner strength.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Fear No Limits */}
          <Carousel.Item
            style={{ height: carouselHeight, position: "relative" }}
          >
            <img
              src={fitnesswomen}
              alt="Fear No Limits"
              style={{
                width: "100%",
                height: carouselHeight,
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                background: gradientBg,
              }}
            />
            <Carousel.Caption
              className="d-none d-md-block"
              style={{ zIndex: 2 }}
            >
              <h5
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                Fear No Limits
              </h5>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #14696a" }}>
                Push beyond boundaries.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Work For It */}
          <Carousel.Item
            style={{ height: carouselHeight, position: "relative" }}
          >
            <img
              src={workForIt}
              alt="Work For It"
              style={{
                width: "100%",
                height: carouselHeight,
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                background: gradientBg,
              }}
            />
            <Carousel.Caption
              className="d-none d-md-block"
              style={{ zIndex: 2 }}
            >
              <h5
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                Work For It
              </h5>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #14696a" }}>
                Success requires effort.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Good Day */}
          <Carousel.Item
            style={{ height: carouselHeight, position: "relative" }}
          >
            <img
              src={goodDay}
              alt="Good Day"
              style={{
                width: "100%",
                height: carouselHeight,
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                background: gradientBg,
              }}
            />
            <Carousel.Caption
              className="d-none d-md-block"
              style={{ zIndex: 2 }}
            >
              <h5
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                Good Day
              </h5>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #14696a" }}>
                Today is your day to shine.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Together */}
          <Carousel.Item
            style={{ height: carouselHeight, position: "relative" }}
          >
            <img
              src={together}
              alt="You can do it!"
              style={{
                width: "100%",
                height: carouselHeight,
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                background: gradientBg,
              }}
            />
            <Carousel.Caption
              className="d-none d-md-block"
              style={{ zIndex: 2 }}
            >
              <h5
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px #14696a",
                  fontWeight: 700,
                }}
              >
                You can do it!
              </h5>
              <p style={{ color: "#fff", textShadow: "0 2px 8px #14696a" }}>
                Believe in yourself and all that you are.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
export default HeroSlider;
