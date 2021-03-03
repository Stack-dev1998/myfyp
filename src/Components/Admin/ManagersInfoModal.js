import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { Modal, Spinner, Button } from "react-bootstrap";

const cookie = new Cookies();
export default function ManagerInfoModal(props) {
  const [userRequest, setUserRequest] = useState({
    serverData: null,
    isLoaded: false,
  });
  useEffect(() => {
    axios("http://localhost:5000/admin/download-image", {
      method: "post",
      data: { imgPath: props.data.imgPath },
      headers: {
        "x-access-token": cookie.get("admin"),
      },

      withCredentials: true,
    }).then((res) => {
      setUserRequest({
        serverData: res.data.img.data,
        isLoaded: true,
      });
    });
  }, []);
  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    const imgString = window.btoa(binary);
    const base64Flag = "data:image/jpeg;base64,";
    const finalImg = base64Flag + imgString;

    return finalImg;
  };
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
          {userRequest.isLoaded ? (
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
                  src={arrayBufferToBase64(userRequest.serverData)}
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
                        Email :
                      </p>
                      <p style={{ display: "inline", paddingLeft: "2px" }}>
                        {data.email}
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
                        Password :
                      </p>
                      <p style={{ display: "inline", paddingLeft: "5px" }}>
                        {data.password.slice(0, 20) + "..."}
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
                        {data._manager.address}
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
                        Salary :
                      </p>
                      <p style={{ display: "inline", paddingLeft: "5px" }}>
                        {data._manager.salary}
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
                        Branch :
                      </p>
                      <p style={{ display: "inline", paddingLeft: "5px" }}>
                        {data._manager.branch}
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
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                verticalAlign: "center",
                backgroundColor: "white",
              }}
            >
              <Spinner
                animation="grow"
                variant="dark"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
              <h3>Loading...</h3>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
