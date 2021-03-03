import React, { useEffect, useState, usesta } from "react";
import axios from "axios";
import image from "../../images/2.jpg";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Container, Row, Col, Media } from "react-bootstrap";

function DonorsReview() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    axios("http://localhost:5000/public/donor-reviews", {
      method: "post",
      data: { skip, limit },
    }).then((res) => {
      console.log(res.data.donorsWithFeedback);
      const newfeedbacks = res.data.donorsWithFeedback;
      setFeedbacks(newfeedbacks);
    });
  }, []);
  const loadMoreHandler = () => {
    const newSkip = skip + limit;
    setSkip(newSkip);
    if (skip !== newSkip) {
      axios({
        method: "post",
        url: "http://localhost:5000/public/load-more-reviews",
        data: {
          limit: limit,
          skip: skip,
        },
      }).then((res) => {
        var oldFeedbacks = feedbacks;
        res.data.donorsWithFeedback.map((item) => {
          oldFeedbacks.push(item);
        });
        setFeedbacks(oldFeedbacks);
      });
    }
  };
  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer.data));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    const imgString = window.btoa(binary);
    const base64Flag = "data:image/jpeg;base64,";
    const finalImg = base64Flag + imgString;
    return finalImg;
  };
  return (
    <div>
      <h2
        style={{
          paddingTop: "20px",
          color: "Black",
        }}
        className="text-center"
      >
        Donors Reviews
      </h2>

      <hr style={{ borderBottom: "1px solid darkgray", width: "150px" }}></hr>
      <Container>
        <Row>
          <Col xs="12" md="12" lg="12">
            {feedbacks &&
              feedbacks.map((item) => {
                return (
                  <Media
                    key={item.createdAt}
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  >
                    <img
                      style={{ borderRadius: "50%" }}
                      width={64}
                      height={64}
                      className="mr-3"
                      src={arrayBufferToBase64(item.img)}
                      alt="Generic placeholder"
                    />
                    <Media.Body>
                      <span style={{ display: "inline-flex" }}>
                        <h5>{item.name}</h5>
                        <h6 style={{}}> 10/4/2019</h6>
                      </span>
                      <h3>
                        <Rating
                          name="read-only"
                          value={item.rating}
                          readOnly
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                      </h3>

                      <p style={{ textAlign: "justify", fontSize: "1.1rem" }}>
                        {item.feedback}
                      </p>
                    </Media.Body>
                  </Media>
                );
              })}

            <h4
              className="text-center"
              onClick={() => {
                loadMoreHandler();
              }}
            >
              Load More
            </h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default DonorsReview;
