import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useUser } from "./Context/userContext.jsx";

function NavBar() {
  const { user, logoutUser } = useUser();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logoutUser();
    window.location.href = "/";
    setShowOffcanvas(false);
  };

  const handleNavClick = () => setShowOffcanvas(false);

  return (
    <>
      <style>{`
        .navbar-custom {
          background: linear-gradient(135deg, #14696a 0%, #2274a5 100%) !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .navbar-brand {
          font-weight: 700;
          letter-spacing: 1px;
          color: #00e6ff !important;
        }
        .navbar-logo {
          /* No drop-shadow for a flat look */
        }
        .navbar-nav .nav-link {
          color: #eafcff !important;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .navbar-nav .nav-link:hover, .navbar-nav .nav-link.active {
          color: #00e6ff !important;
        }
        .navbar-avatar {
          width: 32px;
          height: 32px;
          object-fit: cover;
          border-radius: 50%;
          margin-right: 8px;
          border: 2px solid #fff;
        }
        .offcanvas {
          background: linear-gradient(135deg, #14696a 0%, #2274a5 100%) !important;
        }
        .offcanvas .nav-link {
          color: #eafcff !important;
        }
        .offcanvas .nav-link:hover, .offcanvas .nav-link.active {
          color: #00e6ff !important;
        }
      `}</style>
      <Navbar
        bg=""
        variant="dark"
        expand="lg"
        sticky="top"
        className="navbar-custom"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              className="navbar-logo d-inline-block align-top"
              alt="Fitelligence Logo"
            />
            <strong>Fitelligence</strong>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setShowOffcanvas(true)}
          />
          {/* Inline links for desktop (lg and up) */}
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end d-none d-lg-flex"
          >
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/progress">
                Progress Tracking
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/chat">
                    AI Coach
                  </Nav.Link>
                  <Nav.Link as={Link} to="/recipe-history">
                    Recipe History
                  </Nav.Link>
                  <Nav.Link
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {/* Offcanvas for mobile only (below lg) */}
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            className="d-lg-none"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                {user && user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt="avatar"
                    className="navbar-avatar"
                  />
                ) : null}
                {user ? `Welcome, ${user.firstname}!` : "Menu"}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" onClick={handleNavClick}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/progress" onClick={handleNavClick}>
                  Progress Tracking
                </Nav.Link>
                {user ? (
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
                    <Nav.Link
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </Nav.Link>
                  </>
                ) : (
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
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
