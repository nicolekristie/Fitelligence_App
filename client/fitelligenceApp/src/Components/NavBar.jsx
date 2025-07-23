import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useUser } from "./Context/userContext.jsx";

function NavBar() {
  const { user, logoutUser } = useUser();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logoutUser();
    window.location.href = "/"; // Redirect to home
    setExpanded(false);
  };

  // Helper to close navbar on link click
  const handleNavClick = () => setExpanded(false);

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .navbar {
            min-height: 48px !important;
            height: 48px !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            z-index: 1050 !important;
          }
          .navbar-brand {
            font-size: 1.1rem !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .navbar-nav {
            font-size: 1rem !important;
          }
          .nav-link, .navbar-text {
            padding-top: 6px !important;
            padding-bottom: 6px !important;
            font-size: 1rem !important;
          }
          .navbar-toggler {
            padding: 0.25rem 0.75rem !important;
            font-size: 1.2rem !important;
          }
          .navbar-collapse {
            background: #222 !important;
            border-radius: 0 0 12px 12px;
            z-index: 1100 !important;
            position: absolute !important;
            width: 100vw !important;
            left: 0;
            top: 100%;
          }
        }
      `}</style>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="Fitelligence Logo"
            />
            <strong>Fitelligence</strong>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" onClick={handleNavClick}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/progress" onClick={handleNavClick}>
                Progress Tracking
              </Nav.Link>

              {user ? (
                // User is logged in - show personalized menu
                <>
                  <Nav.Link as={Link} to="/profile" onClick={handleNavClick}>
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/chat" onClick={handleNavClick}>
                    AI Coach
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/recipe-history"
                    onClick={handleNavClick}
                  >
                    Recipe History
                  </Nav.Link>
                  <Navbar.Text className="me-3 text-light">
                    Welcome, {user.firstname}! 👋
                  </Navbar.Text>
                  <Nav.Link
                    onClick={() => {
                      handleLogout();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                // User not logged in - show login/register
                <>
                  <Nav.Link as={Link} to="/login" onClick={handleNavClick}>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" onClick={handleNavClick}>
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
