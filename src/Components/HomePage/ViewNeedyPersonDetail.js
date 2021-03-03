import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function EmployeeInfoModal(props) {
  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    const imgString = window.btoa(binary);
    const base64Flag = "data:image/jpeg;base64,";
    const finalImg = base64Flag + imgString;
    return finalImg;
  };
  console.log(props.data);
  var data = props.data;
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
          <div>
            <div
              className="card"
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                border: "none",
              }}
            >
              <img
                src={arrayBufferToBase64(data.img.data)}
                className="card-img-top"
                style={{ height: "30vh" }}
                alt="..."
              />

              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  style={{
                    borderTop: "1px solid rgba(0,0,0,.125)",
                    padding: "10px",
                  }}
                >
                  <span>
                    <p style={{ display: "inline", fontWeight: "500" }}>
                      Name :
                    </p>
                    <p style={{ display: "inline", paddingLeft: "2px" }}>
                      {data.name}
                    </p>
                  </span>
                </li>
                <li
                  className="list-group-item"
                  style={{
                    padding: "10px",
                  }}
                >
                  <span>
                    <p style={{ display: "inline", fontWeight: "500" }}>
                      Contact No. :
                    </p>
                    <p style={{ display: "inline", paddingLeft: "2px" }}>
                      {data.contactNo}
                    </p>
                  </span>
                </li>
                <li
                  className="list-group-item"
                  style={{
                    padding: "10px",
                  }}
                >
                  <span>
                    <p style={{ display: "inline", fontWeight: "500" }}>
                      Address :
                    </p>
                    <p style={{ display: "inline", paddingLeft: "5px" }}>
                      {data.address}
                    </p>
                  </span>
                </li>
                <li
                  className="list-group-item"
                  style={{
                    padding: "10px",
                  }}
                >
                  <span>
                    <p style={{ display: "inline", fontWeight: "500" }}>
                      Detail :
                    </p>
                    <p style={{ display: "inline", paddingLeft: "5px" }}>
                      {data.detail}
                    </p>
                  </span>
                </li>
              </ul>
            </div>
            <Button
              onClick={() => {
                props.onHide();
              }}
              style={{
                border: "none",
                float: "right",
              }}
              className="btn-sm btn-danger"
            >
              close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
