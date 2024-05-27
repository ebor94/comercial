import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://web.ceramicaitalia.com/log.png"
              width="130"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>

        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">          
            <LinkContainer to="/Home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/listquote">
              <Nav.Link>Gestion proformas</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Más" id="basic-nav-dropdown">
              <LinkContainer to="/contact">
                <NavDropdown.Item>Contacto</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/faq">
                <NavDropdown.Item>Preguntas Frecuentes</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/help">
                <NavDropdown.Item>Ayuda</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  )
}
