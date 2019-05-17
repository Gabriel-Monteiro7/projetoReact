import React, { } from 'react';
import '../App.css';
import { Nav, Navbar } from 'react-bootstrap';

const NavBar = (props) => {
    return (
        <div className="App colums">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className="nav-link" onClick = {() => props.changeScreen(1)}>Visualizacao</Nav.Link>
                <Nav.Link className="nav-link" onClick = {() => props.changeScreen(2)}>Cadastro</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />
        </div >
    )
}
export default (NavBar);
