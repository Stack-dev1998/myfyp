import React from "react";
import { Container } from "react-bootstrap";
export default class AdminDashboard extends React.Component {
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
          <p>Welcome to Needy People Dashboard </p>
        </div>
      </Container>
    );
  }
}
