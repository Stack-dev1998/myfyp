import React, { useState, useEffect } from "react";
import image from "../../images/2.jpg";
import { Modal, Spinner, Media } from "react-bootstrap";
import { Cookies } from "react-cookie";
import axios from "axios";
const cookie = new Cookies();
export default function StatusModal(props) {
  const [userrequest, setUSerRequest] = useState({
    isLoaded: false,
    serverData: null,
  });
  useEffect(() => {
    axios("http://localhost:5000/needy-person/check-status", {
      method: "post",
      headers: {
        "x-access-token": cookie.get("needy person"),
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      setUSerRequest({
        serverData: res.data.user,
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
  var user = userrequest.serverData;
  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {
            userrequest.isLoaded ? <div>

              {user.status.state === "approved" ? (
                <h5 style={{ color: "green", textAlign: "center" }}>
                  {user.status.msg}
                </h5>
              ) : (<div>
                {
                  user.status.state === "rejected" ? <h5 style={{ color: "red", textAlign: "center" }}>
                    {user.status.msg}
                  </h5> : <h5 style={{ color: "#c9d820", textAlign: "center" }}>
                      {user.status.msg}
                    </h5>
                }
              </div>
                )}
            </div> : null
          }
        </Modal.Header>
        <Modal.Body>
          {userrequest.isLoaded ? (
            <div>
              <Media>
                <img
                  style={{ borderRadius: "10px" }}
                  width={120}
                  height={120}
                  className="mr-3"
                  src={arrayBufferToBase64(user.img.data)}
                  alt="Generic placeholder"
                />

                <Media.Body>
                  <span>
                    <p style={{ display: "inline", fontWeight: "500" }}>
                      Name :
                    </p>
                    <p style={{ display: "inline", paddingLeft: "5px" }}>
                      {user.name}
                    </p>
                  </span>
                  <br></br>
                  <span>
                    <p style={{ display: "inline", fontWeight: "500" }}>
                      Father Name :
                    </p>
                    <p style={{ display: "inline", paddingLeft: "2px" }}>
                      {user.fatherName}
                    </p>
                  </span>
                  <br></br>
                  <span>
                    <p style={{ display: "inline", fontWeight: "500" }}>
                      City :
                    </p>
                    <p style={{ display: "inline", paddingLeft: "5px" }}>
                      {user.city}
                    </p>
                  </span>
                  <br></br>
                  <span>
                    <p style={{ display: "inline", fontWeight: "500" }}>
                      Contact No :
                    </p>
                    <p style={{ display: "inline", paddingLeft: "5px" }}>
                      {user.contactNo}
                    </p>
                  </span>
                  <br></br>
                  <span>
                    <p style={{ display: "inline", fontWeight: "500" }}>
                      CNIC :
                    </p>
                    <p style={{ display: "inline", paddingLeft: "5px" }}>
                      {user.CNIC}
                    </p>
                  </span>
                  <br></br>
                </Media.Body>
              </Media>
              <h6 style={{ display: "inline" }}>Reasons :</h6>
              <p style={{ display: "inline", textAlign: "justify" }}>
                {user.reasons}
              </p>
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
