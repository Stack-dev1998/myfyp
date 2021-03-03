import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
//imported Components
import NavbarStyle from "./Navbar.module.css";

const NavigationBar = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="md"
        style={{ background: "black" }}
        variant="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div>
            <h1 className={NavbarStyle.brand}>
              <span className={NavbarStyle.greenColor}>Pak </span>
              <span> </span>
              <span style={{ color: "white" }}>Cha</span>
              <span className={NavbarStyle.redColor}>rity</span>
            </h1>
          </div>
          <Nav className={NavbarStyle.small_screen_login}>
            <Nav.Link as={Link} to="/login" className="pull-right">
              LOGIN
            </Nav.Link>
          </Nav>
          <Navbar.Collapse bg="primary" id="responsive-navbar-nav">
            <Nav className="mr-auto ">
              <Nav.Link as={Link} className="active p-2 " to="/">
                HOME
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="active p-2 nav-link"
                to="/needy-people"
              >
                NEEDY PEOPLE
              </Nav.Link>
              <Nav.Link as={Link} className="active p-2 nav-link" to="/cloths">
                CLOTHS
              </Nav.Link>
              <Nav.Link as={Link} className="active p-2 nav-link" to="/foods">
                FOODS
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav className={NavbarStyle.large_screen_login}>
            <Nav.Link as={Link} to="/login" className="active  pull-right">
              LOGIN
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
