import React from "react";
import { Button, Form } from "react-bootstrap";

export default class Search extends React.Component {
  render() {
    return (
      <div
        className="card border-dark mb-3"
        style={{ padding: "1px", marginTop: "30px", border: "none" }}
      >
        <div className="card-header bg-transparent " style={{ padding: "1px" }}>
          <h5 style={{ textAlign: "center" }}> Extra Foods</h5>
        </div>
        <div className="card-body text-success" style={{ padding: "1px" }}>
          <Form className="mb-1 mt-4" method="post">
            {this.props.msg !== null ? (
              <p style={{ color: "red" }}>{this.props.msg}</p>
            ) : null}
            <Form.Group controlId="search by name">
              <input
                style={{
                  border: "0",
                  outline: "0",
                  background: "transparent",
                  borderBottom: "2px solid black",
                  width: "100%",
                  padding: "5px",
                }}
                type="text"
                placeholder="Search By Address"
                onChange={(e) => {
                  this.props.onChange(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              style={{ marginLeft: "auto", marginRight: "auto" }}
              variant="outline-success"
              className="btn-sm btn-block"
              onClick={() => {
                this.props.searching();
              }}
            >
              Search
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
