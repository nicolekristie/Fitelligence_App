import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Profile() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Header as="h3" className="text-center">
              Profile
            </Card.Header>
            <Card.Body className="text-center">
              <h5>Coming Soon!</h5>
              <p className="text-muted">
                Manage your profile and track your fitness progress.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
