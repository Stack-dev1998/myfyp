import React from "react";
import { Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

import "./TopBar.css";
function TopBar() {
  return (
    <Container fluid className="topBar">
      <Row>
        <Container>
          <div className="iconsGroup">
            <FaFacebook className="facebook" />
            <FiTwitter className="twiter" />
            <FaInstagram className="instagram" />
          </div>
        </Container>
      </Row>
    </Container>
  );
}
export default TopBar;
