import React from "react";
import { Modal, Button } from "react-bootstrap";
export default function DeleteFoodModal(props) {
  return (
    <div>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className=""> Are You Sure ?</h4>
          <div style={{ float: "right" }}>
            <Button
              className="btn btn-sm btn-success"
              style={{ width: "50px", marginRight: "10px" }}
              variant="success"
              onClick={() => {
                props.onHide();
              }}
            >
              No
            </Button>
            <Button
              className="btn btn-sm btn-danger"
              style={{ width: "50px" }}
              variant="danger"
              onClick={() => {
                props.delete_handler(props.data.original._id, props.data.index);
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
