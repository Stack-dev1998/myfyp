import React from "react";
import MainImg from "../../assets/images/poor_child1.jpg";
import DonorsReview from "./DonorReview";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaDonate } from "react-icons/fa";
import { FaAccessibleIcon } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import homePageStyle from "./HomePage.module.css";
function IndexPage(props) {
  return (
    <div>
      <div className={homePageStyle.main_section_hieght}>
        <div className={homePageStyle.mainSection}>
          <img
            src={MainImg}
            alt="Main background"
            className={homePageStyle.main_img}
          />
          <div className={homePageStyle.inside_main_section}>
            <Container className={homePageStyle.top_headings}>
              <p className={homePageStyle.firstHeading}>
                There is One Relation Above All
              </p>
              <p className={homePageStyle.secondHeading}>
                Relation Of Humanity
              </p>
              <Row>
                <Col xs="10" sm="7" md="7">
                  <p className={homePageStyle.paragraph}>
                    Help needy people around yourself. You can find out needy
                    people around yourself and help them by sending money . Do
                    not waste food and cloths etc , Make annouce about it and
                    give it to needy people.
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        <Container className={homePageStyle.card_setting}>
          <Row>
            <Col xs="12" md="4" lg="4">
              <Card className={"card bg-dark text-white text-center"}>
                <img
                  className={homePageStyle.img_height}
                  src={MainImg}
                  alt="Card background"
                />
                <div
                  className={
                    homePageStyle.card_menu +
                    " card-body card-img-overlay d-flex flex-column"
                  }
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <Card.Title className="">
                    <FaDonate className={homePageStyle.card_icons} />
                    <br></br>
                    <span>Donor</span>
                  </Card.Title>
                  <Card.Text>
                    Search and find most needy person and send him or her Money
                  </Card.Text>
                  <Button
                    variant="primary"
                    className={"align-self-end mt-auto btn  btn-block"}
                    onClick={() => props.history.push("/needy-people")}
                  >
                    Donat Money
                  </Button>
                </div>
              </Card>
            </Col>

            <Col xs="12" md="4" lg="4" className={homePageStyle.margin_top}>
              <Card className={"card bg-dark text-white text-center"}>
                <img
                  className={homePageStyle.img_height}
                  src={MainImg}
                  alt="Card background"
                />
                <div
                  className={
                    homePageStyle.card_menu +
                    " card-body card-img-overlay d-flex flex-column"
                  }
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <Card.Title>
                    {" "}
                    <FaAccessibleIcon className={homePageStyle.card_icons} />
                    <br></br>
                    <span>Needy Person</span>
                  </Card.Title>
                  <Card.Text className="text-center">
                    Create Profile and after clearing status, you will be albe
                    to recieve money from Donors.
                  </Card.Text>
                  <Button
                    className={" mt-auto btn  btn-block"}
                    variant="primary"
                    onClick={() => props.history.push("/signup")}
                  >
                    Become Needy
                  </Button>
                </div>
              </Card>
            </Col>

            <Col xs="12" md="4" lg="4" className={homePageStyle.margin_top}>
              <Card className={"card bg-dark text-white text-center"}>
                <img
                  className={homePageStyle.img_height}
                  src={MainImg}
                  alt="Card background"
                />
                <div
                  className={
                    homePageStyle.card_menu +
                    " card-body card-img-overlay d-flex flex-column"
                  }
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <Card.Title className="text-center">
                    {" "}
                    <FaHotel className={homePageStyle.card_icons} />
                    <br></br>
                    <span> Foods & Cloths Donor</span>
                  </Card.Title>
                  <Card.Text className="text-center">
                    Make announcement about extra Foods and Cloths to help needy
                    people
                  </Card.Text>

                  <Button
                    variant="primary"
                    className={"align-self-end mt-auto btn  btn-block"}
                    onClick={() => props.history.push("/signup")}
                  >
                    Donat Foods & Cloths
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row>
          <Col>
            <h2 className={homePageStyle.pak_charity_heading + " text-center"}>
              "Pak Charity" Is A None-profit Organization Which
            </h2>
            <h2
              className={homePageStyle.danger_text + " text-center"}
              style={{
                paddingBottom: "10px",
                color: "red",
              }}
            >
              Provide Help To Needy people
            </h2>
            <hr className={homePageStyle.line}></hr>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs="12">
            <h3
              className={homePageStyle.help_heading}
              style={{ paddingTop: "10px" }}
            >
              <span className={homePageStyle.danger_color}>Help,, </span>Be The
              Reason For Someone Smile
            </h3>
          </Col>
          <Col xs="12" lg="6">
            <p
              className={homePageStyle.poor_person_paragraph}
              style={{ paddingBottom: "20px" }}
            >
              Try to bring happiness in someone life by send him or her money in
              tuff situation. Your little help can save somenone life
            </p>
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        style={{
          paddingTop: "20px",
          background: "black",
          color: "white",
        }}
      >
        <Container className={homePageStyle.mid_rabon}>
          <Row>
            <Col xs="4" md="4" lg="4" className={homePageStyle.donors}>
              <h3 className="text-center">2390</h3>
              <h3 className="text-center">Donors</h3>
            </Col>
            <Col xs="4" md="4" lg="4" className={homePageStyle.donors}>
              <h3 className="text-center">5M+</h3>
              <h3 className="text-center">Fundrising</h3>
            </Col>
            <Col xs="4" md="4" lg="4" className={homePageStyle.donors}>
              <h3 className="text-center">5898</h3>
              <h3 className="text-center">Needy People</h3>
            </Col>
          </Row>
        </Container>
      </Container>
      <DonorsReview />
      <Footer />
    </div>
  );
}
export default withRouter(IndexPage);
