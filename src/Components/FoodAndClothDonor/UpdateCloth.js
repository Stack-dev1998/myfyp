import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
export default function UpdateClothModal(props) {
  let data = props.data;
  const [updateData, setUpdateData] = useState({
    _id: data._id,
    name: data.name,
    address: data.address,
    contactNo: data.contactNo,
    date: data.date,
    description: data.description,
    imgPath: data.imgPath,
    isLoaded: false,
  });

  const onChangeHandler = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(updateData);
    axios("http://localhost:5000/fc-donor/update-cloth", {
      method: "post",
      data: { cloth: updateData },
      headers: {
        "x-access-token": cookie.get("food and cloth donor"),
      },
      withCredentials: true,
    }).then((res) => {
      setUpdateData({ ...updateData, isLoaded: true });
    });
  };
  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>Update Food Form</h2>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "50px",
            }}
          >
            {updateData.isLoaded && (
              <Alert variant={"success"}>Updated Successfully!</Alert>
            )}
            <Form onSubmit={onSubmitHandler}>
              <Form.Row>
                <Col xs={"12"} md="6">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Name"
                    onChange={onChangeHandler}
                    defaultValue={updateData.name}
                  />
                </Col>
                <Col xs={"12"} md="6">
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    name="address"
                    placeholder="Address"
                    onChange={onChangeHandler}
                    defaultValue={updateData.address}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    name="date"
                    type="date"
                    onChange={onChangeHandler}
                    defaultValue={updateData.date}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Contact#:</Form.Label>
                  <Form.Control
                    name="contactNo"
                    type="number"
                    onChange={onChangeHandler}
                    defaultValue={updateData.contactNo}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    name="description"
                    type="text"
                    onChange={onChangeHandler}
                    defaultValue={updateData.description}
                  />
                </Col>
              </Form.Row>

              <Button type="submit" className="mt-4 btn-block btn-success">
                Update Food
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
