import React, { Component } from "react";
import axios from "axios";
import Footer from "./Footer";
import Search from "./Search";
import SearchLoader from "../../Common/LoadingModal";
import { Container, Col, Row, Media, Button, Spinner } from "react-bootstrap";
import ViewDetailModal from "./ViewNeedyPersonDetail";
import PaymentFormModal from "../../Common/PaymentForm";
export default class NeedyPeople extends Component {
  state = {
    limit: 6,
    skip: 0,
    userData: [],
    originalData: [],
    veiwDetailModalData: "",
    showDetailModal: false,
    showPaymentFormModal: false,
    showPaymentFormData: "",
    isLoaded: false,
    searchLoader: false,
    searchValue: null,
    searchMessage: null,
    images: [],
  };
  componentDidMount() {
    axios({
      method: "post",
      url: "http://localhost:5000/public/all-needy-persons",
      data: {
        limit: this.state.limit,
        skip: this.state.skip,
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        userData: res.data,
        originalData: res.data,
        isLoaded: true,
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
        url: "http://localhost:5000/public/search-needy-person",
        data: { name: this.state.searchValue },
      }).then((res) => {
        this.setState({
          userData: res.data.users,
          searchLoader: false,
        });
      });
    }
  }
  loadMoreHandler() {
    axios({
      method: "post",
      url: "http://localhost:5000/public/needy-person/load-more",
      data: {
        limit: this.state.limit,
        skip: this.state.skip,
      },
    }).then((res) => {
      var userData = this.state.userData;
      res.data.map((item) => {
        userData.push(item);
      });
      this.setState({
        loadMoreSpinner: false,
        userData: userData,
        originalData: userData,
      });
    });
  }
  onChangeHandler = (name) => {
    this.setState({
      searchValue: name,
      searchMessage: null,
    });
    if (name === "") {
      this.setState({
        userData: this.state.originalData,
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
                {this.state.userData
                  ? this.state.userData.map((item) => {
                      return (
                        <Col
                          xs="12"
                          sm="6"
                          md="4"
                          style={{ pading: "0" }}
                          className="pl-0 pr-0 "
                          key={item.id}
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
                                <p
                                  className="card-text"
                                  style={{ textAlign: "justify" }}
                                >
                                  {item.detail.slice(0, 150) + "..."}
                                </p>
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
                                      Contact No:
                                    </p>
                                    <p
                                      style={{
                                        display: "inline",
                                      }}
                                    >
                                      {item.contactNo}
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
                              <div
                                className="card-footer bg-transparent"
                                style={{
                                  padding: "10px",
                                }}
                              >
                                <Button
                                  variant="info"
                                  style={{ border: "none" }}
                                  className="btn-sm "
                                  onClick={() => {
                                    this.setState({
                                      veiwDetailModalData: item,
                                      showDetailModal: true,
                                    });
                                  }}
                                >
                                  View Detail
                                </Button>

                                <Button
                                  style={{
                                    background: "black",
                                    border: "none",
                                    float: "right",
                                  }}
                                  className="btn-sm"
                                  onClick={() => {
                                    this.setState({
                                      showPaymentFormData: item,
                                      showPaymentFormModal: true,
                                    });
                                  }}
                                >
                                  Donat Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Col>
                      );
                    })
                  : null}
                <Footer />
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
                          skip: this.state.limit + this.state.skip,
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

        {this.state.showPaymentFormModal ? (
          <PaymentFormModal
            data={this.state.showPaymentFormData}
            show={this.state.showPaymentFormModal}
            onHide={() => this.setState({ showPaymentFormModal: false })}
          />
        ) : null}
        {this.state.showDetailModal ? (
          <ViewDetailModal
            data={this.state.veiwDetailModalData}
            show={this.state.showDetailModal}
            onHide={() => this.setState({ showDetailModal: false })}
          />
        ) : null}
        {this.state.searchLoader ? (
          <SearchLoader show={this.state.searchLoader} />
        ) : null}
      </Container>
    );
  }
}
