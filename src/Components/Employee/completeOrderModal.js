import React from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Modal, Button, Card, Form } from "react-bootstrap";
export default class CompleteOrderModal extends React.Component {
  state = {
    data: this.props.data,
    fatherName: "",
    cnic: "",
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    const fatherName = this.state.fatherName;
    const cnic = this.state.cnic;
    const data = this.state.data;
    axios({
      method: "post",
      url: "http://localhost:5000/employee/complete-order",
      data: { fatherName, data, cnic },
    }).then((res) => {
      console.log(res);
    });
  };
  render() {
    console.log(this.props.data);
    return (
      <div>
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>
                  {" "}
                  Enter CNIC and Father Name For Confirmation
                </Card.Title>
                <Form method="post" onSubmit={this.submitHandler}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Father Name</Form.Label>
                    <Form.Control
                      name="fatherName"
                      type="text"
                      placeholder="Enter Father Name"
                      onChange={this.onChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>CNIC Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="cnic"
                      onChange={this.onChangeHandler}
                      placeholder="Enter CNIC Number"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
