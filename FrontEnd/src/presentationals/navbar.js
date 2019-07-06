import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../App.css";


const NavBar = props => {
  return (
    <div className="">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className="nav-link"
              onClick={() => props.changeScreen(1)}
            >
              Visualizacao
            </Nav.Link>
            <Nav.Link
              className="nav-link"
              onClick={() => props.changeScreen(2)}
            >
              Cadastro
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </div>
  );
};
export default NavBar;
