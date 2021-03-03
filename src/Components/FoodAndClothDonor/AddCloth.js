import React from "react";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Button, Form, Col, Spinner } from "react-bootstrap";
import { ReactComponent as UpArrowIcon } from "../../assets/Icons/up-link.svg";
import AddEmployeeImg from "../../assets/images/add_employee_img.png";
import addFormsStyle from "./addFormsStyle.module.css";
import { Cookies } from "react-cookie";

const SignupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address required"),
  contactNo: yup.string().required("Contact number is required"),
  description: yup.string().required("description is required"),
});
const cookie = new Cookies();

export default class AddCloth extends React.Component {
  state = {
    isSubmitting: false,
    file: null,
    pictureIsRequired: null,
    serverMessage: "",
    showMessage: false,
    submiting: false,
  };
  handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    let file = e.target.files[0];
    this.setState({ file: file, pictureIsRequired: null });
  };
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <div className={addFormsStyle.top_menu}>ADD CLOTH MENU</div>
        <div className={addFormsStyle.image_div}>
          <img src={AddEmployeeImg} alt="add employee" />
        </div>

        <Formik
          initialValues={{
            name: "",
            address: "",
            contactNo: "",
            description: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            if (this.state.file === null) {
              return this.setState({
                pictureIsRequired: "Picture is required!",
              });
            }
            this.setState({
              isSubmitting: true,
            });
            let myFormData = new FormData();
            myFormData.append("file", this.state.file);
            for (const key in values) {
              myFormData.append(key, values[key]);
            }
            axios({
              method: "post",
              url: "http://localhost:5000/fc-donor/add-cloth",
              data: myFormData,
              headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": cookie.get("food and cloth donor"),
              },
              withCredentials: true,
            }).then((response) => {
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
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form method="post" onSubmit={handleSubmit}>
              <div className={addFormsStyle.form_div}>
                <Form.Row>
                  <Col className="mt-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      name="name"
                      placeholder="food name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={values.name}
                    />
                    {errors.name && touched.name && (
                      <span style={{ color: "red" }}>{errors.name}</span>
                    )}
                  </Col>
                  <Col xs={"12"} md="6" className="mt-2">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                      name="address"
                      placeholder="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={values.address}
                    />
                    {errors.address && touched.address && (
                      <span style={{ color: "red" }}>{errors.address}</span>
                    )}
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col className="mt-2">
                    <Form.Label>Contact No:</Form.Label>
                    <Form.Control
                      name="contactNo"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={values.contactNo}
                    />
                    {errors.contactNo && touched.contactNo && (
                      <span style={{ color: "red" }}>{errors.contactNo}</span>
                    )}
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col className="mt-2">
                    <Form.Label> Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={values.description}
                    />
                    {errors.description && touched.description && (
                      <span style={{ color: "red" }}>{errors.description}</span>
                    )}
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col className="mt-2">
                    <Form.Label> Picture:</Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={this.handleFileChange}
                    />
                    <span style={{ color: "red" }}>
                      {this.state.pictureIsRequired}
                    </span>
                  </Col>
                </Form.Row>

                <Button
                  type="submit"
                  className="mt-4 btn-block btn-sm btn-success "
                  disabled={this.state.isSubmitting}
                >
                  <span>
                    <span
                      style={{
                        float: "left",
                        fontSize: "18px",
                        paddingLeft: "7px",
                      }}
                    >
                      Announce new cloth
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
