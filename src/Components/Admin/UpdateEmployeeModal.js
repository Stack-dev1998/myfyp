import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
export default function UpdateEmployeeModal(props) {
  let data = props.data;
  const [updateData, setUpdateData] = useState({
    _id: data._id,
    name: data.name,
    email: data.email,
    password: data.password,
    branch: data._employee.branch,
    address: data._employee.address,
    salary: data._employee.salary,
    isLoaded: false,
  });

  const onChangeHandler = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios("http://localhost:5000/admin/update-employee", {
      method: "post",
      data: { user: updateData },
      headers: {
        "x-access-token": cookie.get("admin"),
      },
      withCredentials: true,
    }).then((res) => {
      setUpdateData({ isLoaded: true });
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
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="text-center"> {props.title}</h4>
          <div
            style={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {" "}
            {updateData.isLoaded && (
              <Alert variant={"success"}>Updated Successfully!</Alert>
            )}
            <Form onSubmit={onSubmitHandler}>
              <Form.Group controlId="forName">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  onChange={onChangeHandler}
                  defaultValue={updateData.name}
                />
              </Form.Group>
              <Form.Group controlId="forEmail">
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  onChange={onChangeHandler}
                  defaultValue={updateData.email}
                />
              </Form.Group>
              <Form.Group controlId="forpassword">
                <Form.Label>Password :</Form.Label>
                <Form.Control
                  name="password"
                  type="text"
                  onChange={onChangeHandler}
                  defaultValue={updateData.password}
                />
              </Form.Group>
              <Form.Group controlId="forSalary">
                <Form.Label>Salary :</Form.Label>
                <Form.Control
                  name="salary"
                  type="text"
                  onChange={onChangeHandler}
                  defaultValue={updateData.salary}
                />
              </Form.Group>
              <Form.Group controlId="forAddress">
                <Form.Label>Address :</Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  onChange={onChangeHandler}
                  defaultValue={updateData.address}
                />
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  name="branch"
                  as="select"
                  onChange={onChangeHandler}
                  defaultValue={updateData.branch}
                >
                  <option>Kohat</option>
                  <option>Peshawar</option>
                  <option>Lahore</option>
                </Form.Control>
              </Form.Group>

              <Button type="submit" className="mt-4 btn-block btn-primary">
                Update
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
