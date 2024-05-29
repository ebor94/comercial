import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineLogout } from "react-icons/ai";




export default function NavBar() {
  return (
<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           <Navbar className="bg-body-tertiary">
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
      </Navbar>
          </Nav>
          <Nav>
            <Nav.Link href="#deets"><AiOutlineLogout style={{ fontSize: '24px' }}/></Nav.Link>
            {/* <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
