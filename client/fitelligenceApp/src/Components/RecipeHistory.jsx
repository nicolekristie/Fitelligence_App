import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useUser } from "./Context/userContext.jsx";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function RecipeHistory() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !showHistory) return;
    setLoading(true);
    setError(null);
    axios
      .get(`/api/recipe/history/${user.id}`)
      .then((res) => {
        if (res.data.success) {
          setRecipes(res.data.data);
        } else {
          setError("Failed to fetch recipe history.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching recipe history.");
        setLoading(false);
      });
  }, [user, showHistory]);

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
    navigate("/chat-recipe");
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
              Recipe History
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h5>
                  Your AI Recipe Responses
                  {recipes.length > 0 && (
                    <Badge bg="success" className="ms-2">
                      {recipes.length}
                    </Badge>
                  )}
                </h5>
                <p className="text-muted">
                  Review your previous AI-generated recipes. This page displays
                  your recipe history so you can revisit healthy meal ideas and
                  nutrition tips.
                </p>
                {user?.id ? (
                  <Button
                    variant={showHistory ? "outline-secondary" : "success"}
                    onClick={toggleHistory}
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? (
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
                      "Hide Recipe History"
                    ) : (
                      "View Recipe History"
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

              {showHistory && recipes.length > 0 && (
                <div className="mt-4">
                  <h6 className="mb-4 text-center">
                    <i className="fas fa-utensils me-2"></i>
                    Recent AI Recipe Responses
                  </h6>
                  <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                    {recipes.map((item, index) => (
                      <Card key={item.id} className="mb-4 shadow-sm border-0">
                        <Card.Header className="bg-light border-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <Badge bg="success" pill className="me-2">
                                #{recipes.length - index}
                              </Badge>
                              <small className="text-muted fw-bold">
                                AI Recipe Response
                              </small>
                            </div>
                            <small className="text-muted">
                              <i className="fas fa-clock me-1"></i>
                              {formatDate(item.timestamp || item.created_at)}
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
                            <ReactMarkdown>{item.response_text}</ReactMarkdown>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        setLoading(true);
                        axios
                          .get(`/api/recipe/history/${user.id}`)
                          .then((res) => {
                            if (res.data.success) {
                              setRecipes(res.data.data);
                            }
                            setLoading(false);
                          })
                          .catch(() => setLoading(false));
                      }}
                      disabled={loading}
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

              {showHistory && recipes.length === 0 && !loading && !error && (
                <div className="mt-4">
                  <Alert variant="info" className="text-center py-4">
                    <i className="fas fa-utensils fa-2x mb-3 text-success"></i>
                    <h5>No recipe history found</h5>
                    <p className="mb-3">
                      Start asking for recipes to see them appear here!
                    </p>
                    <Button onClick={handleChatRedirect} variant="success">
                      <i className="fas fa-utensils me-2"></i>
                      Go to Recipe Chat
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

  return (
    <div className="recipe-history-container">
      <h2>Your Recipe History</h2>
      {recipes.map((item) => (
        <div key={item.id} className="recipe-history-item">
          <div className="recipe-timestamp">
            {new Date(item.timestamp || item.created_at).toLocaleString()}
          </div>
          <div className="recipe-response">
            <ReactMarkdown>{item.response_text}</ReactMarkdown>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default RecipeHistory;
