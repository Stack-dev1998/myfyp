import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Container, Row, Col } from "react-bootstrap";
import headerStyle from "./HomePageHeader.module.css";

function Header() {
  return (
    <Container fluid className={headerStyle.Header}>
      <Container>
        <Row>
          <Col xs="5" md="5" lg="6">
            <div>
              <h1 className={headerStyle.brand}>
                <span className={headerStyle.greenColor}>Pak </span>
                <span> </span>
                <span>Cha</span>
                <span className={headerStyle.redColor}>rity</span>
              </h1>
            </div>
          </Col>
          <Col xs="7" md="7" lg="6">
            <div className={headerStyle.pull_right}>
              <span className={headerStyle.circleWithGmail}>
                <span className={headerStyle.redCircle}>
                  <AiOutlineMail className={headerStyle.emailicon} />
                </span>
                <span className={headerStyle.gmail}>Pakcharity@gmail.com</span>
              </span>
              <span className={headerStyle.circleWithGmail}>
                <span className={headerStyle.redCircle}>
                  <AiOutlineMail className={headerStyle.emailicon} />
                </span>
                <span className={headerStyle.gmail}>Asia, Pakistan</span>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Header;
