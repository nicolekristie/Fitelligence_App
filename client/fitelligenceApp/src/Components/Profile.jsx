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
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "unset", marginTop: "32px", position: "relative" }}
      >
        {/* Stretches image on the left side, responsive */}
        <Col
          xs={2}
          md={2}
          className="d-none d-sm-flex flex-column align-items-end justify-content-center"
          style={{ paddingRight: 0 }}
        >
          <img
            src={stretchesImg}
            alt="Stretches"
            style={{
              width: "100%",
              maxWidth: 320,
              minWidth: 120,
              height: "auto",
              borderRadius: 32,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              objectFit: "contain",
              background: "#fff",
              border: "2.5px solid #43cea2",
              filter: "brightness(0.8) contrast(1.15)",
              marginBottom: 12,
            }}
          />
        </Col>
        {/* Profile card centered and responsive */}
        <Col
          xs={12}
          md={8}
          className="d-flex align-items-center justify-content-center"
          style={{ position: "relative", minWidth: 0 }}
        >
          <Card
            style={{
              width: "100%",
              maxWidth: 820,
              minWidth: 260,
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
                <Col xs={12} md={8} style={{ minWidth: 180 }}>
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
                        marginLeft: "12vw",
                        transition: "margin 0.3s",
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
                    <Col xs={5} sm={4}>
                      <FaUser style={{ marginRight: 8 }} />
                      <strong>First Name:</strong>
                    </Col>
                    <Col xs={7} sm={8} style={{ fontSize: 18 }}>
                      {user.firstname}
                    </Col>
                  </Row>
                  <Row className="mb-4 align-items-center">
                    <Col xs={5} sm={4}>
                      <FaUser style={{ marginRight: 8 }} />
                      <strong>Last Name:</strong>
                    </Col>
                    <Col xs={7} sm={8} style={{ fontSize: 18 }}>
                      {user.lastname}
                    </Col>
                  </Row>
                  <Row className="mb-4 align-items-center">
                    <Col xs={5} sm={4}>
                      <FaUserTag style={{ marginRight: 8 }} />
                      <strong>Username:</strong>
                    </Col>
                    <Col xs={7} sm={8} style={{ fontSize: 18 }}>
                      {user.username}
                    </Col>
                  </Row>
                  <Row className="mb-4 align-items-center">
                    <Col xs={5} sm={4}>
                      <FaEnvelope style={{ marginRight: 8 }} />
                      <strong>Email:</strong>
                    </Col>
                    <Col xs={7} sm={8} style={{ fontSize: 18 }}>
                      {user.email}
                    </Col>
                  </Row>
                  <Row className="mb-4 align-items-center">
                    <Col xs={5} sm={4}>
                      <FaCalendarAlt style={{ marginRight: 8 }} />
                      <strong>Member Since:</strong>
                    </Col>
                    <Col xs={7} sm={8} style={{ fontSize: 18 }}>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : ""}
                    </Col>
                  </Row>
                </Col>
                {/* Kettlebell image inside card, responsive */}
                <Col
                  xs={12}
                  md={4}
                  className="d-flex align-items-center justify-content-center mb-3 mb-md-0"
                  style={{ minWidth: 120, position: "relative" }}
                >
                  <img
                    src={kettleballImg}
                    alt="Kettlebell Workouts"
                    style={{
                      width: "100%",
                      maxWidth: 200,
                      minWidth: 100,
                      height: "auto",
                      borderRadius: 28,
                      boxShadow: "0 4px 18px rgba(0,0,0,0.14)",
                      objectFit: "contain",
                      background: "#fff",
                      marginRight: 12,
                      marginTop: "7vw",
                      transition: "margin 0.3s",
                    }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {/* Facts image on the right side, responsive */}
        <Col
          xs={2}
          md={2}
          className="d-none d-sm-flex flex-column align-items-start justify-content-center"
          style={{ paddingLeft: 0 }}
        >
          <img
            src={factsImg}
            alt="Facts"
            style={{
              width: "100%",
              maxWidth: 520,
              minWidth: 200,
              height: "auto",
              borderRadius: 60,
              boxShadow: "0 4px 30px rgba(0,0,0,0.17)",
              objectFit: "cover",
              background: "#fff",
              border: "5px solid #43cea2",
              marginBottom: 12,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default Profile;
