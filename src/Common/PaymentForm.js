import React from "react";
import axios from "axios";

import { Cookies } from "react-cookie";
import TextField from "@material-ui/core/TextField";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import { ReactComponent as UpArrowIcon } from "../assets/Icons/up-link.svg";

const cookie = new Cookies();
export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needyPerson: this.props.data,
      cardNumber: "",
      issueDate: "",
      amount: "",
      msg: "",
      msgStatus: "",
      submitLoader: false,
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler = (name) => {
    this.setState({
      [name.target.name]: name.target.value,
    });
  };
  onSubmitHandler(e) {
    e.preventDefault();
    var { cardNumber, issueDate, amount } = this.state;
    this.setState({ submitLoader: true });
    if (cardNumber === "" || issueDate === "" || amount == "") {
      this.setState({
        submitLoader: false,
        msgStatus: "fail",
        msg: "All fields are required!",
      });
    }

    axios({
      method: "post",
      url: "http://localhost:5000/donor/submit-order",
      data: this.state,
      headers: {
        "x-access-token": cookie.get("donor"),
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      this.setState({
        msgStatus: res.data.status,
        serverMsg: res.data.msg,
        submitLoader: false,
      });
    });
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h4 className="text-center">Payment Form</h4>
          {this.state.msg.length ? (
            <Alert
              style={{ width: "70%" }}
              className="text-center"
              variant={this.state.msgStatus === "fail" ? "danger" : "sucess"}
            >
              {this.state.msg}
            </Alert>
          ) : null}
          <form
            onSubmit={this.onSubmitHandler}
            className="success text-center"
            noValidate
            autoComplete="off"
          >
            <TextField
              id="card_number"
              label="Credit Card Number"
              color="primary"
              name="cardNumber"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.onChangeHandler}
              style={{ width: "70%", marginTop: "20px" }}
            />
            <br></br>
            <TextField
              id="issueDate"
              name="issueDate"
              type="date"
              label="Credit card issue date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ width: "70%", marginTop: "20px" }}
              onChange={this.onChangeHandler}
            />
            <br></br>
            <TextField
              id="amount"
              label="Amount"
              name="amount"
              color="primary"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.onChangeHandler}
              style={{ width: "70%", marginTop: "20px" }}
            />
            <br></br>
            <div
              style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
            >
              <Button
                type="submit"
                className=" mt-4 btn-block"
                style={{ background: "black" }}
              >
                <span>
                  <span
                    style={{
                      float: "left",
                      fontSize: "20px",
                      paddingLeft: "7px",
                    }}
                  >
                    Donat
                  </span>
                  <span
                    style={{
                      float: "right",
                      marginRight: "7px",
                      marginTop: "2px",
                    }}
                  >
                    {this.state.submitLoader ? (
                      <Spinner animation="grow" variant="light" />
                    ) : (
                      <UpArrowIcon></UpArrowIcon>
                    )}
                  </span>
                </span>
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
