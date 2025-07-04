import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useUser } from "./Context/userContext.jsx";

function Profile() {
  const { user, isLoading } = useUser();

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

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Header as="h3" className="text-center">
              My Profile
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>First Name:</strong>
                </Col>
                <Col sm={9}>{user.firstname}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Last Name:</strong>
                </Col>
                <Col sm={9}>{user.lastname}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Username:</strong>
                </Col>
                <Col sm={9}>{user.username}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Email:</strong>
                </Col>
                <Col sm={9}>{user.email}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Member Since:</strong>
                </Col>
                <Col sm={9}>
                  {new Date(user.created_at).toLocaleDateString()}
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
