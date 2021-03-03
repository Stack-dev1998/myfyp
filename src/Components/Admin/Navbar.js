import React, { useState } from "react";
import AddModal from "./AddModal";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState("");

  return (
    <Navbar collapseOnSelect expand="sm" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse bg="primary" id="responsive-navbar-nav">
        <Nav className="mr-auto ">
          <Nav.Link as={Link} className="active p-2 " to="/allmanagers">
            ALL MANAGERS
          </Nav.Link>
          <Nav.Link
            as={Link}
            className="active p-2 nav-link"
            to="/allemployees"
          >
            ALL EMPLOYEES
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              setShowAddModal(true);
              setTitle("Add Employee");
            }}
            className="active p-2 nav-link"
            to="/addemployee"
          >
            ADD EMPLOYEES
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              setShowAddModal(true);
              setTitle("Add Manager");
            }}
            className="active p-2 nav-link"
            to="/addmanager"
          >
            ADD MANAGER
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <Nav.Link className="active ">Logout</Nav.Link>
      </Nav>
      <AddModal
        title={title}
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
    </Navbar>
  );
}
