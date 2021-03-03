import React from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  Button,
  Row,
  Col,
  Form,
  Alert,
  Spinner,
  Card,
  Container,
} from "react-bootstrap";
import { ReactComponent as UpArrowIcon } from "../../assets/Icons/up-link.svg";
import AddEmployeeStyle from "./addEmployees.module.css";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const SignupSchema = yup.object().shape({
  name: yup.string().required(" Name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
  salary: yup.string().required("Salary is required"),
  address: yup.string().required("Address is required"),
  branch: yup.string().required("branch is required"),
});

export default class AddManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      serverMessage: "",
      isSubmitting: false,
      showMessage: false,
      submiting: false,
    };
  }
  handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    let file = e.target.files[0];
    this.setState({ file: file });
  };
  componentWillUnmount() {
    clearInterval(() => {
      this.setState({ showMessage: false });
    }, 5000);
  }
  render() {
    return (
      <Container fluid className={AddEmployeeStyle.signup_component}>
        <Row>
          <Card
            className={AddEmployeeStyle.my_form}
            style={{ width: "32rem", border: "none" }}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "32px" }} className="mb-4">
                Create Employees
              </Card.Title>

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  role: "",
                  salary: "",
                  branch: "",
                  address: "",
                  file: "",
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
                    url: "http://localhost:5000/admin/add-employees",
                    data: myFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                    .then((response) => {
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
                  //handle error
                }}
              >
                {({ errors, touched, handleSubmit }) => (
                  <Form
                    method="post"
                    onSubmit={handleSubmit}
                    enctype="multipart/form-data"
                  >
                    {this.state.showMessage && (
                      <Alert
                        variant={
                          this.state.serverMessage.status == "success"
                            ? "success"
                            : "danger"
                        }
                      >
                        {this.state.serverMessage.msg}
                      </Alert>
                    )}
                    <Row>
                      <Col>
                        <Form.Label htmlFor="Name">
                          <h6>Name*</h6>
                        </Form.Label>
                        {errors.name && touched.name ? (
                          <span style={{ color: "red" }}>
                            {" " + errors.name}
                          </span>
                        ) : null}
                        <Field
                          type="text"
                          className={AddEmployeeStyle.input_fields}
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
                          <span style={{ color: "red" }}>
                            {" " + errors.email}
                          </span>
                        ) : null}
                        <Field
                          type="email"
                          className={AddEmployeeStyle.input_fields}
                          name="email"
                          placeholder="abcd@gmail.com"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Form.Label htmlFor="password">
                          <h6>Password*</h6>
                        </Form.Label>
                        {errors.password && touched.password ? (
                          <span style={{ color: "red" }}>
                            {" " + errors.password}
                          </span>
                        ) : null}
                        <Field
                          type="password"
                          className={AddEmployeeStyle.input_fields}
                          name="password"
                          placeholder="*******"
                        />
                      </Col>
                      <Col>
                        <Form.Label htmlFor="salary">
                          <h6>Salary*</h6>
                        </Form.Label>
                        {errors.salary && touched.salary ? (
                          <span style={{ color: "red" }}>
                            {" " + errors.salary}
                          </span>
                        ) : null}
                        <Field
                          type="text"
                          className={AddEmployeeStyle.input_fields}
                          name="salary"
                          placeholder="RS.10000"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col>
                        <Form.Label>
                          <h6>Role*</h6>
                        </Form.Label>
                        {errors.role && touched.role ? (
                          <span style={{ color: "red" }}>
                            {" " + errors.role}
                          </span>
                        ) : null}
                        <Field
                          as="select"
                          name="role"
                          className={AddEmployeeStyle.input_fields}
                        >
                          <option value="">Choose...</option>
                          <option value="manager">Manager</option>
                          <option value="employee"> employee</option>
                        </Field>
                      </Col>
                      <Col>
                        <Form.Label>
                          <h6>Branch*</h6>
                        </Form.Label>
                        {errors.branch && touched.branch ? (
                          <span style={{ color: "red" }}>
                            {" " + errors.branch}
                          </span>
                        ) : null}
                        <Field
                          as="select"
                          name="branch"
                          className={AddEmployeeStyle.input_fields}
                        >
                          <option value="">Choose...</option>
                          <option value="kohat">Kohat</option>
                          <option value="peshawar"> Peshawar</option>
                        </Field>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Form.Label htmlFor="Address">
                          <h6>Address*</h6>
                        </Form.Label>
                        {errors.address && touched.address ? (
                          <span style={{ color: "red" }}>
                            {" " + errors.address}
                          </span>
                        ) : null}
                        <Field
                          type="text"
                          className={AddEmployeeStyle.input_fields}
                          name="address"
                          placeholder="eg kohat"
                        />
                      </Col>
                      <Col>
                        <Form.Label htmlFor="file">
                          {" "}
                          <h6>Picture*</h6>{" "}
                        </Form.Label>

                        <Field
                          type="file"
                          className={AddEmployeeStyle.input_fields}
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
                          Create Employee
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
      </Container>
    );
  }
}
