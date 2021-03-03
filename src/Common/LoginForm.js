import React from "react";
import { ReactComponent as UpArrowIcon } from "../assets/Icons/up-link.svg";
import LoginAndSignupFormsStyle from "./loginAndSignupFormsStyle.module.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import {
  Row,
  Container,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
const cookies = new Cookies();
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSubmitting: false,
      serverMessage: null,
      showMessage: false,
    };
  }
  handelSubmit = (e) => {
    e.preventDefault();
    if (this.state.email === "") {
      this.setState({ serverMessage: "Email is Required", showMessage: true });
    } else if (this.state.password === "") {
      this.setState({
        serverMessage: "Password is Required",
        showMessage: true,
      });
    } else {
      this.setState({ isSubmitting: true });
      const myFormData = {
        email: this.state.email,
        password: this.state.password,
      };
      axios({
        method: "post",
        url: "http://localhost:5000/login",
        data: myFormData,
      }).then((response) => {
        const token = response.data.token;
        cookies.set(response.data.tokenName, token);

        this.props.history.push(response.data.role);
        this.setState({
          isSubmitting: false,
          serverMessage: response.data.msg,
          showMessage: true,
        });

        setInterval(() => {
          this.setState({
            showMessage: false,
          });
        }, 5000);
      });
    }
  };
  handelChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Container fluid className={LoginAndSignupFormsStyle.signup_component}>
        <Row>
          <Card
            style={{ width: "28rem", border: "none" }}
            className={LoginAndSignupFormsStyle.my_form}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "32px" }} className="mb-4">
                Login
              </Card.Title>
              {this.state.showMessage && (
                <Alert variant={"danger"}>{this.state.serverMessage}</Alert>
              )}
              <div className="mt-4">
                <Form.Label>
                  <h6>Email </h6>
                </Form.Label>
              </div>
              <Form method="post" onSubmit={this.handelSubmit}>
                <input
                  type="email"
                  className={LoginAndSignupFormsStyle.input_fields}
                  name="email"
                  placeholder="abcd@gmail.com"
                  onChange={this.handelChange}
                />
                <div className="mt-4 ">
                  <Form.Label>
                    <h6> Passwrod </h6>
                  </Form.Label>
                </div>
                <input
                  type="password"
                  className={LoginAndSignupFormsStyle.input_fields}
                  name="password"
                  placeholder="***********"
                  onChange={this.handelChange}
                />
                <h6 className="mt-4"> Forgot your password?</h6>
                <Button
                  type="submit"
                  className="mt-4 btn-block signup-btn p-2"
                  style={{ background: "black" }}
                >
                  <span
                    style={{
                      float: "left",
                      fontSize: "22px",
                      paddingLeft: "7px",
                    }}
                  >
                    Login
                  </span>
                  <span
                    style={{
                      float: "right",
                      marginRight: "7px",
                      marginTop: "2px",
                    }}
                  >
                    {this.state.isSubmitting ? (
                      <Spinner animation="grow" variant="light" />
                    ) : (
                      <UpArrowIcon></UpArrowIcon>
                    )}
                  </span>
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <h6 className="text-center pt-4 ml-auto mr-auto">
            Don't have an account yet?{" "}
            <Link
              to="signup"
              style={{ color: "black", textDecorationLine: "underline" }}
            >
              Create one
            </Link>{" "}
          </h6>
        </Row>
      </Container>
    );
  }
}
export default withRouter(Signin);
