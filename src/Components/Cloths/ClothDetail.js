import React from "react";
import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import { Modal, Carousel } from "react-bootstrap";

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
          <h3>Name : {props.data.Name}</h3>

          <h3> Quantity :{props.data.Quantity}</h3>

          <h3>Address :{props.data.Address}</h3>
        </div>
      </div>
    </Modal>
  );
}
