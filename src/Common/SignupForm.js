import React, { Component } from "react";
import {
  Button,
  Form,
  Card,
  Row,
  Col,
  Container,
  Alert,
  Spinner,
} from "react-bootstrap";
import { ReactComponent as UpArrowIcon } from "../assets/Icons/up-link.svg";
import { Formik, Field } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link, withRouter } from "react-router-dom";
import LoginAndSignupFormsStyle from "./loginAndSignupFormsStyle.module.css";
const SignupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("email required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Password does not matched"),
  role: yup.string().required("Role is reqiured"),
});

class SignUpForm extends Component {
  state = {
    isSubmitting: false,
    file: null,
    serverMessage: "",
    showMessage: false,
    submiting: false,
  };

  handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    let file = e.target.files[0];
    this.setState({ file: file });
  };
  componentWillUnmount() {
    setInterval(() => {
      this.setState({
        showMessage: false,
      });
    }, 10000);
  }
  render(props) {
    return (
      <Container fluid className={LoginAndSignupFormsStyle.signup_component}>
        <Row>
          <Card
            className={LoginAndSignupFormsStyle.my_form}
            style={{ width: "28rem", border: "none" }}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "32px" }} className="mb-4">
                Create account
              </Card.Title>
              {this.state.showMessage && (
                <Alert
                  variant={
                    this.state.serverMessage.status == "success"
                      ? "success"
                      : "danger"
                  }
                >
                  {" "}
                  {this.state.serverMessage.msg}
                </Alert>
              )}
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  role: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  this.setState({ isSubmitting: true });
                  let myFormData = new FormData();
                  myFormData.append("file", this.state.file);
                  for (const key in values) {
                    myFormData.append(key, values[key]);
                  }

                  axios({
                    method: "post",
                    url: "http://localhost:5000/signup",
                    data: myFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                    .then((response) => {
                      if (response.data.status === "success") {
                        this.props.history.push("/login");
                      }
                      this.setState({
                        isSubmitting: false,
                        serverMessage: response.data,
                        showMessage: true,
                      });
                      setInterval(() => {
                        this.setState({
                          showMessage: false,
                        });
                      }, 5000);
                    })
                    .catch((e) => {
                      e.response &&
                        this.setState({
                          isSubmitting: false,
                          serverMessage: e.response.data,
                          showMessage: true,
                        });
                      e.response && this.setState({ isSubmiting: false });
                      setInterval(() => {
                        this.setState({
                          showMessage: false,
                        });
                      }, 10000);
                    });
                }}
              >
                {({ errors, touched, handleSubmit }) => (
                  <Form method="post" onSubmit={handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Label htmlFor="Name">
                          <h6>Name*</h6>
                        </Form.Label>
                        {errors.name && touched.name ? (
                          <span
                            className={LoginAndSignupFormsStyle.error_message}
                          >
                            {" " + errors.name}
                          </span>
                        ) : null}
                        <Field
                          type="text"
                          className={LoginAndSignupFormsStyle.input_fields}
                          name="name"
                          placeholder="John"
                        />
                      </Col>
                      <Col>
                        <Form.Label htmlFor="email">
                          {" "}
                          <h6>Email*</h6>{" "}
                        </Form.Label>
                        {errors.email && touched.email ? (
                          <span
                            className={LoginAndSignupFormsStyle.error_message}
                          >
                            {" " + errors.email}
                          </span>
                        ) : null}
                        <Field
                          type="email"
                          className={LoginAndSignupFormsStyle.input_fields}
                          name="email"
                          placeholder="abcd@gmail.com"
                        />
                      </Col>
                    </Row>
                    <div className="mt-4">
                      <Form.Label>
                        <h6>Password*</h6>
                      </Form.Label>
                      {errors.password && touched.password ? (
                        <span
                          className={LoginAndSignupFormsStyle.error_message}
                        >
                          {"    " + errors.password}
                        </span>
                      ) : null}
                    </div>
                    <Field
                      type="password"
                      className={LoginAndSignupFormsStyle.input_fields}
                      name="password"
                      placeholder="**********"
                    />
                    <div className="mt-4">
                      <Form.Label>
                        {" "}
                        <h6>Confirm Password*</h6>{" "}
                      </Form.Label>
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <span
                          className={LoginAndSignupFormsStyle.error_message}
                        >
                          {"    " + errors.confirmPassword}
                        </span>
                      ) : null}
                    </div>
                    <Field
                      type="password"
                      className={LoginAndSignupFormsStyle.input_fields}
                      name="confirmPassword"
                      placeholder="***********"
                    />

                    <Row className="mt-3">
                      <Col>
                        <Form.Label>
                          <h6>Are You*</h6>
                        </Form.Label>
                        {errors.role && touched.role ? (
                          <span
                            className={LoginAndSignupFormsStyle.error_message}
                          >
                            {" " + errors.role}
                          </span>
                        ) : null}
                        <Field
                          as="select"
                          name="role"
                          className={LoginAndSignupFormsStyle.input_fields}
                        >
                          <option value="">Choose...</option>
                          <option value="donor">Donor</option>
                          <option value="needy person"> Needy Person</option>
                          <option value="food and cloth donor">
                            Food and Cloth Donor
                          </option>
                        </Field>
                      </Col>
                      <Col>
                        <Form.Label htmlFor="file">
                          {" "}
                          <h6>Picture*</h6>{" "}
                        </Form.Label>

                        <Field
                          type="file"
                          className={LoginAndSignupFormsStyle.input_fields}
                          name="file"
                          onChange={this.handleFileChange}
                        />
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      className="mt-4 btn-block signup-btn p-2"
                      style={{ background: "black" }}
                    >
                      <span>
                        <span
                          style={{
                            float: "left",
                            fontSize: "22px",
                            paddingLeft: "7px",
                          }}
                        >
                          Create account
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
                      </span>
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <h6 className="text-center pt-4 ml-auto mr-auto">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "black", textDecorationLine: "underline" }}
            >
              Login
            </Link>{" "}
          </h6>
        </Row>
      </Container>
    );
  }
}
export default withRouter(SignUpForm);
