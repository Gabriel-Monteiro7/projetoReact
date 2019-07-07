import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
const NavBar = props => {
  return (
    <div className="">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="#home" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Visualizacao
            </Link>
            <Link to="/cadastro" className="nav-link">
              Cadastro
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </div>
  );
};
export default NavBar;
