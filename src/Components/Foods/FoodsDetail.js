import React from "react";
import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import { Modal, Carousel, Row, Col } from "react-bootstrap";

export default function ClothDetail(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{ background: "rgb(200, 209, 206)" }}
        closeButton
      ></Modal.Header>
      <Modal.Body
        style={{
          background: "rgb(200, 209, 206)",
          borderBottom: "1px solid white"
        }}
      >
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block "
              style={{
                width: "80%",
                height: "50vh",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              src={image1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block "
              src={image2}
              style={{
                width: "80%",
                height: "50vh",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Modal.Body>
      <div style={{ background: "rgb(200, 209, 206)" }}>
        <div style={{ marginLeft: "20px" }}>
          <Row>
            <Col xs="6" md="6" lg="6">
              {" "}
              <h5>Name : {props.data.Name}</h5>
              <h5> Date:{props.data.Date}</h5>
              <h5>Time :{props.data.Time}</h5>
            </Col>
            <Col xs="6" md="6" lg="6">
              <h5>Address :{props.data.Address}</h5>
              <h5>Type :{props.data.Type}</h5>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}
