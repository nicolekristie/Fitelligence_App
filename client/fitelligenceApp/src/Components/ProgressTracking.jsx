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
import { Link, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

function ProgressTracking() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

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
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return `Today, ${date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffInDays === 1) {
      return `Yesterday, ${date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffInDays < 7) {
      return date.toLocaleString("en-US", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleChatRedirect = () => {
    navigate("/chat");
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
              Progress Tracking
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h5>
                  Your AI Fitness Coach Conversations
                  {chatHistory.length > 0 && (
                    <Badge bg="primary" className="ms-2">
                      {chatHistory.length}
                    </Badge>
                  )}
                </h5>
                <p className="text-muted">
                  Review your previous conversations with your AI fitness coach.
                  This page displays your chat history so you can revisit your
                  coach's advice, feedback, and motivation as you progress on
                  your fitness journey.
                </p>
                {user?.id ? (
                  <Button
                    variant={showHistory ? "outline-secondary" : "primary"}
                    onClick={toggleHistory}
                    disabled={isLoading}
                    size="lg"
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
                      "Hide Chat History"
                    ) : (
                      "View Chat History"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleLogin}
                    variant="outline-warning"
                    size="lg"
                  >
                    Please log in to view history
                  </Button>
                )}
              </div>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}

              {showHistory && chatHistory.length > 0 && (
                <div className="mt-4">
                  <h6 className="mb-4 text-center">
                    <i className="fas fa-comments me-2"></i>
                    Recent AI Coach Responses
                  </h6>
                  <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                    {chatHistory.map((item, index) => (
                      <Card key={item.id} className="mb-4 shadow-sm border-0">
                        <Card.Header className="bg-light border-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <Badge bg="primary" pill className="me-2">
                                #{chatHistory.length - index}
                              </Badge>
                              <small className="text-muted fw-bold">
                                AI Coach Response
                              </small>
                            </div>
                            <small className="text-muted">
                              <i className="fas fa-clock me-1"></i>
                              {formatDate(item.timestamp)}
                            </small>
                          </div>
                        </Card.Header>
                        <Card.Body className="py-4">
                          <div
                            className="ai-response-text"
                            style={{
                              fontSize: "1rem",
                              lineHeight: "1.6",
                              color: "#2c3e50",
                            }}
                          >
                            <Markdown>{item.response_text}</Markdown>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <Button
                      variant="outline-primary"
                      onClick={fetchChatHistory}
                      disabled={isLoading}
                      className="me-2"
                    >
                      <i className="fas fa-sync-alt me-2"></i>
                      Refresh History
                    </Button>
                    <Button variant="outline-secondary" onClick={toggleHistory}>
                      <i className="fas fa-eye-slash me-2"></i>
                      Hide History
                    </Button>
                  </div>
                </div>
              )}

              {showHistory &&
                chatHistory.length === 0 &&
                !isLoading &&
                !error && (
                  <div className="mt-4">
                    <Alert variant="info" className="text-center py-4">
                      <i className="fas fa-comment-dots fa-2x mb-3 text-info"></i>
                      <h5>No chat history found</h5>
                      <p className="mb-3">
                        Start chatting with your AI fitness coach to see
                        responses here!
                      </p>
                      <Button onClick={handleChatRedirect} variant="primary">
                        <i className="fas fa-comments me-2"></i>
                        Go to Chat
                      </Button>
                    </Alert>
                  </div>
                )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProgressTracking;
