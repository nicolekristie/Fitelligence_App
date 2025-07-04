import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Workouts() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Header as="h3" className="text-center">
              Workouts
            </Card.Header>
            <Card.Body className="text-center">
              <h5>Coming Soon!</h5>
              <p className="text-muted">
                Sample workout plans and routines to help you achieve your fitness goals.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Workouts;
