import React, { Component } from "react";
import axios from "axios";
import Footer from "../HomePage/Footer";
import Search from "./Search";
import SearchLoader from "../../Common/LoadingModal";
import { Container, Row, Col, Spinner } from "react-bootstrap";
export default class Foods extends Component {
  state = {
    pageNumber: 1,
    pageSize: 6,
    loadMoreSpinner: false,
    foodsData: [],
    originalData: [],
    isLoaded: false,
    searchLoader: false,
    searchValue: null,
    searchMessage: null,
    images: [],
  };
  componentDidMount() {
    axios({
      method: "post",
      url: "http://localhost:5000/public/foods",
      data: {
        pageNumber: this.state.pageNumber,
        pageSize: this.state.pageSize,
      },
    }).then((res) => {
      console.log(res.data);
      this.setState({
        foodsData: res.data,
        originalData: res.data,
        isLoaded: true,
      });
    });
  }
  loadMoreHandler() {
    axios({
      method: "post",
      url: "http://localhost:5000/public/foods/load-more",
      data: {
        pageNumber: this.state.pageNumber,
        pageSize: this.state.pageSize,
      },
    }).then((res) => {
      var foods = this.state.foodsData;
      res.data.map((item) => {
        foods.push(item);
      });
      this.setState({
        loadMoreSpinner: false,
        foodData: foods,
        originalData: foods,
      });
    });
  }

  searchHandler() {
    if (this.state.searchValue === null || this.state.searchValue === "") {
      this.setState({ searchMessage: "Please enter something!" });
    } else {
      this.setState({
        searchLoader: true,
      });
      axios({
        method: "post",
        url: "http://localhost:5000/public/foods/search",
        data: { name: this.state.searchValue },
      }).then((res) => {
        this.setState({
          foodsData: res.data,
          searchLoader: false,
        });
      });
    }
  }
  onChangeHandler = (name) => {
    this.setState({
      searchValue: name,
      searchMessage: null,
    });
    if (name === "") {
      this.setState({
        foodsData: this.state.originalData,
      });
    }
  };
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer.data));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    const imgString = window.btoa(binary);
    const base64Flag = "data:image/jpeg;base64,";
    const finalImg = base64Flag + imgString;
    return finalImg;
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="12" sm="3" md="3" lg="3">
            <Search
              msg={this.state.searchMessage}
              searching={(name) => {
                this.searchHandler(name);
              }}
              onChange={this.onChangeHandler}
            />
          </Col>
          {this.state.isLoaded ? (
            <Col xs="12" sm="9" md="9" lg="9">
              <Row>
                {this.state.foodsData
                  ? this.state.foodsData.map((item) => {
                      return (
                        <Col
                          xs="12"
                          sm="6"
                          md="4"
                          style={{ pading: "0" }}
                          className="pl-0 pr-0 "
                          key={item._id}
                        >
                          <div
                            style={{
                              border: "0.05rem solid white",
                              marginTop: "20px",
                              padding: "10px",
                              borderRadius: "10px",
                            }}
                          >
                            <div
                              className="card"
                              style={{
                                boxShadow:
                                  " 1px 7px 15px 0px rgba(182,187,212,1)",
                              }}
                            >
                              <img
                                src={this.arrayBufferToBase64(item.img)}
                                className="card-img-top"
                                style={{ height: "25vh" }}
                                alt="..."
                              />
                              <div
                                className="card-body"
                                style={{ padding: "10px", height: "25vh auto" }}
                              >
                                <h5 className="card-title text-capitalize">
                                  {item.name}
                                </h5>
                              </div>
                              <ul className="list-group list-group-flush">
                                <li
                                  className="list-group-item"
                                  style={{
                                    borderTop: "1px solid rgba(0,0,0,.125)",
                                    padding: "10px",
                                  }}
                                >
                                  <span>
                                    <p
                                      style={{
                                        display: "inline",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Date:
                                    </p>
                                    <p
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      {item.date}
                                    </p>
                                  </span>
                                </li>
                                <li
                                  className="list-group-item"
                                  style={{
                                    borderTop: "1px solid rgba(0,0,0,.125)",
                                    padding: "10px",
                                  }}
                                >
                                  <span>
                                    <p
                                      style={{
                                        display: "inline",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Start Time:
                                    </p>
                                    <p
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      {item.startTime}
                                    </p>
                                  </span>
                                </li>
                                <li
                                  className="list-group-item"
                                  style={{
                                    borderTop: "1px solid rgba(0,0,0,.125)",
                                    padding: "10px",
                                  }}
                                >
                                  <span>
                                    <p
                                      style={{
                                        display: "inline",
                                        fontWeight: "500",
                                      }}
                                    >
                                      End Time:
                                    </p>
                                    <p
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      {item.endTime}
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
                                    <p
                                      style={{
                                        display: "inline",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Address:
                                    </p>
                                    <p
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      {item.address}
                                    </p>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Col>
                      );
                    })
                  : null}
              </Row>

              <div className="text-center mt-3">
                {this.state.loadMoreSpinner ? (
                  <div>
                    {" "}
                    <Spinner
                      animation="grow"
                      variant="dark"
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                    />
                    <h3>Loading...</h3>
                  </div>
                ) : (
                  <a
                    href="#"
                    onClick={() => {
                      this.setState(
                        {
                          loadMoreSpinner: true,
                          pageNumber: this.state.pageNumber + 1,
                        },
                        () => {
                          this.loadMoreHandler();
                        }
                      );
                    }}
                  >
                    Load More
                  </a>
                )}
              </div>
            </Col>
          ) : (
            <Col>
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
            </Col>
          )}
        </Row>
        {this.state.searchLoader ? (
          <SearchLoader show={this.state.searchLoader} />
        ) : null}
        <Footer />
      </Container>
    );
  }
}
