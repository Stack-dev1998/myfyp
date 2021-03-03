import React, { useState } from "react";
import { Button, Form, Col, Row, Spinner } from "react-bootstrap";

export default function LoadingModal(props) {
  const [value, setValue] = useState(props.show);
  return (
    <div
      style={{
        display: value ? "flex" : "none",
        position: "fixed",
        zIndex: "1",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        overFlow: "auto",
        backgroundColor: "rgb(0,0,0)",
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "center",
        color: "white",
      }}
    >
      <Spinner
        animation="grow"
        variant="whaite"
        style={{
          width: "100px",
          height: "100px",
        }}
      />
      <h3>Loading...</h3>
    </div>
  );
}
