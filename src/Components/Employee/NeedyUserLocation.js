import Footer from "../../Common/Footer";
import React, { Component } from "react";
import Header from "../../Common/Header";
import GoogleMapReact from "google-map-react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class NeedyUserLocation extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  render() {
    return (
      <div>
        <Container style={{ height: "80vh" }}>
          <h2
            style={{
              paddingTop: "20px",
              paddingBottom: "10px",
            }}
            className="text-center"
          >
            User Location
          </h2>
          <Row>
            <Col xs="12" md="6">
              <div
                style={{ height: "48vh", width: "100%", marginBottom: "20px" }}
              >
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "" }}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}
                >
                  <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="Mark"
                  />
                </GoogleMapReact>
              </div>
            </Col>
            <Col xs="12" md="6">
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>
                    {" "}
                    Enter CNIC and Father Name For Confirmation
                  </Card.Title>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Father Name</Form.Label>
                      <Form.Control
                        type="fatherName"
                        placeholder="Enter Father Name"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>CNIC Number</Form.Label>
                      <Form.Control
                        type="cnicNumber"
                        placeholder="Enter CNIC Number"
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
