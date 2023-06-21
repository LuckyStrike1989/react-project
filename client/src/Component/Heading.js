import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import firebase from "../firebase.js";

function Heading() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">React-Community</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" style={{
              color: "white",
              textDecoration: "none",
              marginRight: "10px"
            }}>
              Home
            </Link>
            <Link to="/upload" style={{
              color: "white",
              textDecoration: "none",
              marginRight: "10px"
            }}>
              Upload
            </Link>
            <Link to="/list" style={{
              color: "white",
              textDecoration: "none",
              marginRight: "10px"
            }}>
              List
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {user.accessToken === "" ? (
            <Link to="/login" style={{
              color: "white",
              textDecoration: "none"
            }}>
              Login
            </Link>
          ) : (
            <Navbar.Text 
              style={{ color: "white", cursor: "pointer" }}
              onClick={LogoutHandler}
            >
                Logout
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Heading