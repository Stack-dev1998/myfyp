import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const cookie = new Cookies();
export default function VerificationModal(props) {
  const [rating, setRating] = useState(3);
  const [data, setData] = useState(props.data);
  const [feedback, setFeedback] = useState("");
  const [serverResponse, setServerResponse] = useState({
    fatherName: "",
    cnic: "",
  });

  useEffect(() => {
    axios("http://localhost:5000/donor/verify-order", {
      method: "post",
      data: { data },
      headers: {
        "x-access-token": cookie.get("donor"),
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res.data.data);
      setServerResponse({
        fatherName: res.data.data.fatherName,
        cnic: res.data.data.cnic,
      });
    });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const donorId = props.data.donor._id;
    axios("http://localhost:5000/donor/feedback", {
      method: "post",
      data: { rating, feedback, donorId },
      headers: {
        "x-access-token": cookie.get("donor"),
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        xs="12"
      >
        <Modal.Header closeButton>
          <h4 className="text-center"> {props.title}</h4>
        </Modal.Header>
        <Modal.Body>
          <p
            className="text-center"
            style={{
              font: "30px",
              color: "green",
              fontWeight: "700",
            }}
          >
            Successfully Matched
          </p>
          <Row>
            <Col xs="6">
              <h5 className="">Recieved Data</h5>
              <p>Father Name:{serverResponse.fatherName}</p>
              <p>CNIC No:{serverResponse.cnic}</p>
            </Col>

            <Col xs="6">
              <h5 className="">Actual Data</h5>
              <p>Father Name:{serverResponse.fatherName}</p>
              <p>CNIC No:{serverResponse.cnic}</p>
            </Col>
            <div className="pl-3 pr-3">
              <b style={{ fontSize: "1.3rem", fontFamily: "bold" }}>Note: </b>
              <span style={{ fontSize: "0.9rem" }}>
                The Needy Person information is only visible to you and needy
                person.If it is matched then your donation is Successfully
                recieved by Needy Person
              </span>
            </div>
          </Row>
          <hr style={{ border: "1px solid black" }}></hr>
          <Row>
            <Col>
              <p
                className="text-center mt-2 mb-2"
                style={{ fontWeight: "700", fontSize: "22px" }}
              >
                Your Feedback about Organization
              </p>
              <Form method="post" onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Label style={{ fontSize: "28px" }}>Rating</Form.Label>
                  <Rating
                    style={{
                      fontSize: "40px",
                    }}
                    onChange={(value) => {
                      setRating(value.target.value);
                    }}
                    value={parseInt(rating)}
                    max={5}
                    name="rating"
                    emptyIcon={<StarBorderIcon style={{ fontSize: "40px" }} />}
                  />
                </InputGroup>

                <Form.Group>
                  <Form.Label>Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    type="password"
                    placeholder="Your Feedback"
                    onChange={(value) => {
                      setFeedback(value.target.value);
                    }}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ float: "right" }}
                >
                  Submit Feedback
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
