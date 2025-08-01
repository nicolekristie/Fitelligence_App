import React, { useState } from "react";
import { Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import { FaUser, FaEnvelope, FaUserTag, FaCalendarAlt } from "react-icons/fa";
import { useUser } from "./Context/userContext.jsx";
import ProfileAvatar from "./ProfileAvatar.jsx";
import FitnessSurvey from "./FitnessSurvey.jsx";

function Profile() {
  const { user, isLoading, validateCurrentToken } = useUser();
  const [editing, setEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });
  const [editError, setEditError] = useState("");
  const [activeTab, setActiveTab] = useState("about");

  React.useEffect(() => {
    if (editing && user) {
      setEditFields({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        username: user.username || "",
      });
    }
  }, [editing, user]);

  // Submit handler for edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFields),
      });
      const data = await response.json();
      if (response.ok) {
        setEditing(false);
        await validateCurrentToken(); // Refresh user context
      } else {
        setEditError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setEditError("Failed to update profile.");
    }
  };

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

  // Remove extra top margin and whitespace above "My Profile"
  // Add space at the top border of the page
  return (
    <Container style={{ marginTop: 32, paddingTop: 0 }}>
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "unset", marginTop: 0, position: "relative" }}
      >
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
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 0,
              margin: "0 auto",
              position: "relative",
              background: "linear-gradient(135deg, #232323 0%, #b31217 100%)",
              color: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 18px rgba(179,18,23,0.18)",
              border: "2px solid #b31217",
            }}
          >
            <Card.Header
              as="h3"
              className="text-center"
              style={{
                background: "linear-gradient(90deg, #b31217 0%, #000 100%)",
                color: "#fff",
                borderRadius: "12px",
                fontWeight: 700,
                letterSpacing: 1,
                boxShadow: "0 2px 8px rgba(179,18,23,0.10)",
                padding: "14px 0 10px 0",
                marginBottom: 10,
                fontSize: 30,
              }}
            >
              My Profile
            </Card.Header>
            <Card.Body
              style={{
                paddingTop: 0,
                paddingBottom: 24,
                paddingLeft: 24,
                paddingRight: 24,
              }}
            >
              <Tabs
                activeKey={activeTab}
                onSelect={setActiveTab}
                className="mb-4"
                fill
              >
                <Tab eventKey="about" title="About">
                  <Row>
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
                      <Row className="mb-4 align-items-center">
                        <Col xs={5} sm={4}>
                          <button
                            className="profile-edit-btn"
                            onClick={() => setEditing(true)}
                          >
                            Edit
                          </button>
                        </Col>
                      </Row>
                      {/* Edit Profile Form */}
                      {editing && (
                        <Row className="mb-4">
                          <Col xs={12}>
                            <form
                              onSubmit={handleEditSubmit}
                              style={{
                                background:
                                  "linear-gradient(135deg, #232323 0%, #b31217 100%)", // palette background
                                color: "#fff",
                                padding: 20,
                                borderRadius: 8,
                                boxShadow: "0 2px 8px rgba(179,18,23,0.10)",
                              }}
                            >
                              <h5 style={{ marginBottom: 16 }}>Edit Profile</h5>
                              <div className="mb-3">
                                <label
                                  htmlFor="firstname"
                                  className="form-label"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstname"
                                  value={editFields.firstname}
                                  onChange={(e) =>
                                    setEditFields({
                                      ...editFields,
                                      firstname: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="lastname"
                                  className="form-label"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastname"
                                  value={editFields.lastname}
                                  onChange={(e) =>
                                    setEditFields({
                                      ...editFields,
                                      lastname: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="username"
                                  className="form-label"
                                >
                                  Username
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="username"
                                  value={editFields.username}
                                  onChange={(e) =>
                                    setEditFields({
                                      ...editFields,
                                      username: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              <div style={{ display: "flex", gap: 12 }}>
                                <button
                                  type="submit"
                                  className="profile-save-btn"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="profile-cancel-btn"
                                  onClick={() => setEditing(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                              {editError && (
                                <div className="mt-3 text-danger">
                                  {editError}
                                </div>
                              )}
                            </form>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="survey" title="Fitness Survey">
                  <Row>
                    <Col xs={12} md={8} style={{ minWidth: 180 }}>
                      <FitnessSurvey />
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    // {/* </div> */}
  );
}
export default Profile;
