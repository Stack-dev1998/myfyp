import React, { useState } from "react";
import { Col, Media, Button } from "react-bootstrap";
import image from "../../images/1.jpg";
import FoodsDetail from "./FoodsDetail";
function FoodsCard(props) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <Col xs="12" md="6" lg="4">
      <div
        className="centerCard"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          border: "1px solid white",
          padding: "15px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <Media>
          <img
            style={{ borderRadius: "10px" }}
            width={80}
            height={70}
            className="mr-3"
            src={image}
            alt="Generic placeholder"
          />

          <Media.Body>
            <span>
              <p style={{ display: "inline", fontWeight: "500" }}>Name :</p>
              <p style={{ display: "inline", paddingLeft: "5px" }}>
                {" "}
                {props.data.Name}
              </p>
            </span>
            <br></br>
            <span>
              <p style={{ display: "inline", fontWeight: "500" }}>Date :</p>
              <p style={{ display: "inline", paddingLeft: "5px" }}>
                {" "}
                {props.data.Date}
              </p>
            </span>

            <br></br>
            <span>
              <p style={{ display: "inline", fontWeight: "500" }}>Time :</p>
              <p
                style={{
                  display: "inline",
                  paddingLeft: "5px",
                }}
              >
                {props.data.Start_Time}
              </p>
              <span
                style={{
                  display: "inline",
                  paddingLeft: "5px",
                  paddingRight: "2px",
                  fontWeight: "500",
                }}
              >
                To
              </span>
              <p
                style={{
                  display: "inline",
                  paddingLeft: "2px",
                }}
              >
                {props.data.End_Time}
              </p>
            </span>

            <br></br>
          </Media.Body>
        </Media>
        <h6 style={{ display: "inline" }}>Detail :</h6>
        <p style={{ display: "inline", textAlign: "justify" }}>
          {" " + props.data.Detail}
        </p>

        <Button
          onClick={() => setShowDetail(true)}
          variant="primary"
          className="btn-block"
        >
          View Detail
        </Button>
        <FoodsDetail
          data={props.data}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      </div>
    </Col>
  );
}
export default FoodsCard;
