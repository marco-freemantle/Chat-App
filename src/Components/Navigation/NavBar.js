import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="navbar" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="brand-link">
            Chat-App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Link to="/" className="navigation-link">
              <p>Home</p>
            </Link>
            <Link to="/groups" className="navigation-link">
              <p>Groups</p>
            </Link>
            <Link to="/account" className="navigation-link">
              <p>Account</p>
            </Link>
            <Link to="/login" className="navigation-link">
              <p>Logout</p>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
