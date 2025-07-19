import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { useUser } from "./Context/userContext.jsx";

function Workouts() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const { user } = useUser();

  const fetchChatHistory = async () => {
    if (!user?.id) {
      setError("Please log in to view your chat history");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/chat/history/${user.id}?limit=20`);
      const data = await response.json();

      if (data.success) {
        setChatHistory(data.data);
      } else {
        setError(data.error || "Failed to fetch chat history");
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
      setError("Unable to load chat history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showHistory && user?.id) {
      fetchChatHistory();
    }
  }, [showHistory, user?.id]);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Header as="h3" className="text-center">
              Workouts & AI Coach History
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="text-center mb-4">
                    <h5>Workout Plans</h5>
                    <p className="text-muted">
                      Sample workout plans and routines to help you achieve your
                      fitness goals.
                    </p>
                    <Button variant="outline-primary" disabled>
                      Coming Soon!
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="text-center mb-4">
                    <h5>
                      AI Coach History
                      {chatHistory.length > 0 && (
                        <Badge bg="secondary" className="ms-2">
                          {chatHistory.length}
                        </Badge>
                      )}
                    </h5>
                    <p className="text-muted">
                      View your previous conversations with your AI fitness
                      coach.
                    </p>
                    {user?.id ? (
                      <Button
                        variant={showHistory ? "outline-secondary" : "primary"}
                        onClick={toggleHistory}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Loading...
                          </>
                        ) : showHistory ? (
                          "Hide History"
                        ) : (
                          "View Chat History"
                        )}
                      </Button>
                    ) : (
                      <Button variant="outline-warning" disabled>
                        Please log in to view history
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}

              {showHistory && chatHistory.length > 0 && (
                <div className="mt-4">
                  <h6 className="mb-3">Recent AI Coach Responses:</h6>
                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {chatHistory.map((item, index) => (
                      <Card key={item.id} className="mb-3 border-left-primary">
                        <Card.Body className="py-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <Badge bg="primary" className="mb-2">
                              AI Coach Response #{chatHistory.length - index}
                            </Badge>
                            <small className="text-muted">
                              {formatDate(item.timestamp)}
                            </small>
                          </div>
                          <p
                            className="mb-0"
                            style={{ fontSize: "0.95rem", lineHeight: "1.5" }}
                          >
                            {item.response_text}
                          </p>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={fetchChatHistory}
                      disabled={isLoading}
                    >
                      Refresh History
                    </Button>
                  </div>
                </div>
              )}

              {showHistory &&
                chatHistory.length === 0 &&
                !isLoading &&
                !error && (
                  <Alert variant="info" className="mt-3">
                    No chat history found. Start chatting with your AI coach to
                    see responses here!
                  </Alert>
                )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Workouts;
