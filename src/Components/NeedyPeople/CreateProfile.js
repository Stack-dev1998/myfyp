import React from "react";
import { ReactComponent as UpArrowIcon } from "../../assets/Icons/up-link.svg";
import { Formik, Field } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Cookies } from "react-cookie";

import { Button, Form, Modal, Row, Col, Alert, Spinner } from "react-bootstrap";
import ProfileFormStyle from "./ProfileFormStyle.module.css";

const SignupSchema = yup.object().shape({
  fatherName: yup.string().required("FatherName is required"),
  CNIC: yup.string().required("CNIC required"),
  contactNo: yup.string().required("ContactNo is required"),
  city: yup.string().required("City does not matched"),
  reasons: yup.string().required("Reasons is reqiured"),
  address: yup.string().required("Address is reqiured"),
});
const cookies = new Cookies();
export default class CreateProfile extends React.Component {
  state = {
    showMessage: false,
    serverMessage: "",
    isSubmitting: false,
  };
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <h5 style={{ color: "black" }}>Create Profile Menu</h5>
          </Modal.Header>
          <Modal.Body>
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
                fatherName: "",
                CNIC: "",
                contactNo: "",
                city: "",
                reasons: "",
                address: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                this.setState({ isSubmitting: true });
                axios({
                  method: "post",
                  url: "http://localhost:5000/needy-person/create-profile",
                  data: values,
                  headers: {
                    "x-access-token": cookies.get("needy person"),
                  },
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
                      <Form.Label htmlFor="fatherName">
                        <h6>Father Name*</h6>
                      </Form.Label>
                      {errors.fatherName && touched.fatherName ? (
                        <span className={ProfileFormStyle.error_message}>
                          {" " + errors.fatherName}
                        </span>
                      ) : null}
                      <Field
                        type="text"
                        className={ProfileFormStyle.input_fields}
                        name="fatherName"
                        placeholder="John"
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="CNIC">
                        {" "}
                        <h6>CNIC*</h6>{" "}
                      </Form.Label>
                      {errors.CNIC && touched.CNIC ? (
                        <span className={ProfileFormStyle.error_message}>
                          {" " + errors.CNIC}
                        </span>
                      ) : null}
                      <Field
                        type="text"
                        className={ProfileFormStyle.input_fields}
                        name="CNIC"
                        placeholder="22401-#######-9"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col>
                      <Form.Label htmlFor="ContactNo">
                        <h6>ContactNo*</h6>
                      </Form.Label>
                      {errors.contactNo && touched.contactNo ? (
                        <span className={ProfileFormStyle.error_message}>
                          {"    " + errors.contactNo}
                        </span>
                      ) : null}

                      <Field
                        type="text"
                        className={ProfileFormStyle.input_fields}
                        name="contactNo"
                        placeholder="03########"
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="City">
                        <h6>City*</h6>
                      </Form.Label>
                      {errors.city && touched.city ? (
                        <span className={ProfileFormStyle.error_message}>
                          {" " + errors.city}
                        </span>
                      ) : null}
                      <Field
                        as="select"
                        name="city"
                        className={ProfileFormStyle.input_fields}
                      >
                        <option value="">Choose...</option>
                        <option value="kohat">Kohat</option>
                        <option value="peshawar"> Peshawar</option>
                        <option value="islamabad"> Islamabad</option>
                      </Field>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Form.Label>
                      <h6>Address*</h6>
                    </Form.Label>
                    {errors.address && touched.address ? (
                      <span className={ProfileFormStyle.error_message}>
                        {"    " + errors.address}
                      </span>
                    ) : null}
                  </div>
                  <Field
                    type="text"
                    className={ProfileFormStyle.input_fields}
                    name="address"
                    placeholder="Address goes here"
                  />
                  <div className="mt-4">
                    <Form.Label>
                      <h6>Reasons*</h6>
                    </Form.Label>
                    {errors.reasons && touched.reasons ? (
                      <span className={ProfileFormStyle.error_message}>
                        {"    " + errors.reasons}
                      </span>
                    ) : null}
                  </div>
                  <Field
                    type="text"
                    as="textarea"
                    rows="3"
                    className={ProfileFormStyle.input_fields}
                    name="reasons"
                    placeholder="reasons goes here"
                  />
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
                        Create Profile
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
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
