import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
export default class admin extends Component {
  constructor(props) {
    super(props);
    this.state = { post: "" };
  }

  render() {
    return (
      <Container>
        <div
          style={{
            height: "100px",
            background: "	#EFEFF0",
            color: "black",
            marginTop: "100px",
            lineHeight: "100px",
            fontWeight: "700",
            textAlign: "center",
            borderRadius: "50px",
            marginTop: "200px",
          }}
        >
          <p>Welcome to Admin Dashboard </p>
        </div>
      </Container>
    );
  }
}
