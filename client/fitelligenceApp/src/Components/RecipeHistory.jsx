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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000 0%, #b31217 100%)",
        backgroundAttachment: "fixed",
        backgroundImage: "none",
      }}
    >
      <Container className="mt-5">
        <Row>
          <Col>
            <Card
              style={{
                background: "linear-gradient(135deg, #232323 0%, #b31217 100%)", // palette background
                color: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 18px rgba(179,18,23,0.18)",
                border: "2px solid #b31217",
              }}
            >
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
                  <p
                    style={{
                      color: "#fff", // pure white for maximum contrast
                      opacity: 0.92,
                      fontWeight: 500,
                      letterSpacing: "0.2px",
                    }}
                  >
                    Review your previous AI-generated recipes. This page
                    displays your recipe history so you can revisit healthy meal
                    ideas and nutrition tips.
                  </p>
                  {user?.id ? (
                    <Button
                      style={{
                        background:
                          "linear-gradient(90deg, #232323 0%, #b31217 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        borderRadius: 10,
                        border: "none",
                        boxShadow: "0 0 12px #b31217",
                      }}
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
                      size="lg"
                      style={{
                        background:
                          "linear-gradient(90deg, #232323 0%, #b31217 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        borderRadius: 10,
                        border: "none",
                        boxShadow: "0 0 12px #b31217",
                        letterSpacing: "0.2px",
                      }}
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
                        <Card
                          key={item.id}
                          className="mb-4 shadow-sm border-0"
                          style={{
                            background:
                              "linear-gradient(135deg, #232323 0%, #b31217 100%)", // palette background
                            color: "#fff",
                            borderRadius: 14,
                            boxShadow: "0 2px 12px rgba(179,18,23,0.10)",
                            border: "2px solid #b31217",
                          }}
                        >
                          <Card.Header
                            style={{
                              background: "rgba(0,0,0,0.92)",
                              color: "#eafcff",
                            }}
                            className="border-0"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <Badge bg="success" pill className="me-2">
                                  #{recipes.length - index}
                                </Badge>
                                <small
                                  className="fw-bold"
                                  style={{
                                    color: "#fff", // pure white for maximum contrast
                                    opacity: 0.95,
                                    letterSpacing: "0.2px",
                                  }}
                                >
                                  AI Recipe Response
                                </small>
                              </div>
                              <small
                                style={{
                                  color: "#fff", // pure white for maximum contrast
                                  opacity: 0.85,
                                  fontWeight: 500,
                                  letterSpacing: "0.2px",
                                }}
                              >
                                <i className="fas fa-clock me-1"></i>
                                {formatDate(item.timestamp || item.created_at)}
                              </small>
                            </div>
                          </Card.Header>
                          <Card.Body
                            style={{
                              minHeight: 0,
                              background:
                                "linear-gradient(135deg, #232323 0%, #b31217 100%)", // updated to palette
                              backgroundAttachment: "fixed",
                              backgroundImage: "none",
                              padding: "18px 0 8px 0",
                              marginBottom: 4,
                            }}
                          >
                            <div
                              className="ai-response-text"
                              style={{
                                fontSize: "1rem",
                                lineHeight: "1.6",
                                color: "#eafcff", // light text for visibility
                              }}
                            >
                              <ReactMarkdown>
                                {item.response_text}
                              </ReactMarkdown>
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
                        style={{
                          background:
                            "linear-gradient(90deg, #232323 0%, #b31217 100%)", // solid palette background
                          color: "#fff",
                          fontWeight: 700,
                          borderRadius: 10,
                          border: "none",
                          boxShadow: "0 0 12px #b31217",
                        }}
                      >
                        <i className="fas fa-sync-alt me-2"></i>
                        Refresh History
                      </Button>
                      <Button
                        onClick={toggleHistory}
                        style={{
                          background:
                            "linear-gradient(90deg, #232323 0%, #b31217 100%) !important", // palette background
                          color: "#fff !important", // white text for visibility
                          fontWeight: 700,
                          borderRadius: 10,
                          border: "none",
                          boxShadow: "0 0 12px #b31217",
                        }}
                      >
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
    </div>
  );

}

export default RecipeHistory;
