import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUser, FaEnvelope, FaUserTag, FaCalendarAlt } from "react-icons/fa";
import { useUser } from "./Context/userContext.jsx";
import ProfileAvatar from "./ProfileAvatar.jsx";
import workoutsImg from "../assets/images/profile/workouts.jpeg";
import kettleballImg from "../assets/images/profile/kettleballworkouts.jpg";
import stretchesImg from "../assets/images/profile/stretches.jpeg";
import moreworkoutsImg from "../assets/images/profile/moreworkouts.jpg";
import factsImg from "../assets/images/profile/facts.png";

function Profile() {
  const { user, isLoading, validateCurrentToken } = useUser();

  if (isLoading) {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Card>
              <Card.Body className="text-center">
                <p>Loading profile...</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Card>
              <Card.Body className="text-center">
                <p>Please log in to view your profile.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  // Avatar URL: prefer user.avatar_url, fallback to user.profile?.avatar_url, else null
  const avatarUrl =
    user.avatar_url || (user.profile && user.profile.avatar_url) || null;
  const token = localStorage.getItem("token");

  // After upload, refresh user context so avatar persists
  const handleAvatarUpload = async () => {
    await validateCurrentToken();
  };

  return (
    <Container className="mt-5">
      {/* Stretches image at the top, more to the left and lower */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          position: "relative",
          minHeight: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-120px",
            top: "40px",
            zIndex: 2,
          }}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src={stretchesImg}
              alt="Stretches"
              style={{
                width: "100%",
                maxWidth: 340,
                minWidth: 200,
                height: 340,
                borderRadius: 28,
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                objectFit: "contain",
                background: "#fff",
                border: "2.5px solid #43cea2",
                filter: "brightness(0.8) contrast(1.15)",
              }}
            />
          </div>
        </div>
      </div>
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "unset", marginTop: "32px" }}
      >
        {/* Profile card centered - use flex utilities for perfect centering */}
        <Col
          md={8}
          className="d-flex align-items-center justify-content-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Card
            style={{
              width: "100%",
              maxWidth: 820,
              minWidth: 400,
              minHeight: 420,
              padding: "18px 0",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <Card.Header
              as="h3"
              className="text-center"
              style={{
                background: "linear-gradient(90deg, #43cea2, #185a9d)",
                color: "#fff",
                borderRadius: "12px",
                fontWeight: 700,
                letterSpacing: 1,
                boxShadow: "0 2px 8px rgba(24,90,157,0.10)",
                padding: "22px 0",
                marginBottom: 18,
                fontSize: 30,
              }}
            >
              My Profile
            </Card.Header>
            <Card.Body>
              <Row>
                {/* Profile fields */}
                <Col md={8} style={{ minWidth: 320 }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "260px",
                      }}
                    >
                      <ProfileAvatar
                        avatarUrl={avatarUrl}
                        token={token}
                        onUpload={handleAvatarUpload}
                      />
                    </div>
                  </div>
                  <Row className="mb-4 align-items-center">
                    <Col sm={4}>
                      <FaUser style={{ marginRight: 8 }} />
                      <strong>First Name:</strong>
                    </Col>
                    <Col sm={8} style={{ fontSize: 18 }}>
                      {user.firstname}
                    </Col>
                  </Row>
                  <Row className="mb-4 align-items-center">
                    <Col sm={4}>
                      <FaUser style={{ marginRight: 8 }} />
                      <strong>Last Name:</strong>
                    </Col>
                    <Col sm={8} style={{ fontSize: 18 }}>
                      {user.lastname}
                    </Col>
                  </Row>
                  <Row className="mb-4 align-items-center">
                    <Col sm={4}>
                      <FaUserTag style={{ marginRight: 8 }} />
                      <strong>Username:</strong>
                    </Col>
                    <Col sm={8} style={{ fontSize: 18 }}>
                      {user.username}
                    </Col>
                  </Row>
                  <Row className="mb-4 align-items-center">
                    <Col sm={4}>
                      <FaEnvelope style={{ marginRight: 8 }} />
                      <strong>Email:</strong>
                    </Col>
                    <Col sm={8} style={{ fontSize: 18 }}>
                      {user.email}
                    </Col>
                  </Row>
                  <Row className="mb-4 align-items-center">
                    <Col sm={4}>
                      <FaCalendarAlt style={{ marginRight: 8 }} />
                      <strong>Member Since:</strong>
                    </Col>
                    <Col sm={8} style={{ fontSize: 18 }}>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : ""}
                    </Col>
                  </Row>
                </Col>
                {/* Kettlebell image inside card */}
                <Col
                  md={4}
                  className="d-flex align-items-center justify-content-center mb-3 mb-md-0"
                  style={{ minWidth: 200, position: "relative" }}
                >
                  <img
                    src={kettleballImg}
                    alt="Kettlebell Workouts"
                    style={{
                      width: "100%",
                      maxWidth: 260,
                      minWidth: 180,
                      height: 320,
                      borderRadius: 28,
                      boxShadow: "0 4px 18px rgba(0,0,0,0.14)",
                      objectFit: "contain",
                      background: "#fff",
                      marginRight: 12,
                      marginTop: "140px",
                    }}
                  />
                  {/* Facts image to the right of the card */}
                  <div
                    style={{
                      position: "absolute",
                      right: "-440px",
                      top: "-60px",
                      width: "100%",
                      maxWidth: 520,
                      minWidth: 340,
                      height: 220,
                    }}
                  >
                    <img
                      src={factsImg}
                      alt="Facts"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 38,
                        boxShadow: "0 4px 18px rgba(0,0,0,0.14)",
                        objectFit: "cover",
                        background: "#fff",
                        border: "4px solid #43cea2",
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Profile;
