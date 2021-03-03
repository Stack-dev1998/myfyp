import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
export default function UpdateManagerModal(props) {
  let data = props.data;
  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {" "}
          <h4 className="text-center"> {props.title}</h4>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Form>
              <Form.Group controlId="forName">
                <Form.Label>Poor Person Name :</Form.Label>
                <Form.Control type="text" defaultValue={data.poorPersonName} />
              </Form.Group>
              <Form.Group controlId="forAddress">
                <Form.Label>Address :</Form.Label>
                <Form.Control type="address" defaultValue={data.address} />
              </Form.Group>
              <Form.Group controlId="forAMount">
                <Form.Label>Amount :</Form.Label>
                <Form.Control type="text" defaultValue={data.amount} />
              </Form.Group>
              <Form.Group controlId="formGridState">
                <Form.Label>Assigned To :</Form.Label>
                <Form.Control as="select" defaultValue={data.assigneTo}>
                  <option>Hassan</option>
                  <option>Alishan</option>
                  <option>Sohaib</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="forEmail">
                <Form.Label>Assigned Date :</Form.Label>
                <Form.Control type="date" defaultValue={data.assignedDate} />
              </Form.Group>
              <Button onClick={() => {}} className="mt-4 btn-block btn-primary">
                Update
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
