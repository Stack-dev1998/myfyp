import React, { Component } from "react";
import ReactTable from "../../Common/ReactTable";
import Search from "./Search";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import DeleteModal from "./DeleteEmployeeModal";
import EmployeesInfoModal from "./EmployeesInfoModal";
import { Container, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
export default class EmployeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3,
      serverMessage: "",
      showMessage: false,
      showLoader: true,
      data: [],
      filteredData: [],
      columns: [
        {
          Header: "#",
          id: "no",
          accessor: (str) => "no",
          Cell: (tableInfo) => <div>{tableInfo.row.index + 1}</div>,
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Email",
          id: "email",
          accessor: (str) => "email",
          Cell: (tableInfo) => (
            <div>{tableInfo.row.original.email.slice(0, 20) + "..."}</div>
          ),
        },
        {
          Header: "Password",
          id: "password",
          accessor: (str) => "password",
          Cell: (tableInfo) => (
            <div>{tableInfo.row.original.password.slice(0, 10) + "..."}</div>
          ),
        },
        {
          Header: "Address",
          id: "address",
          accessor: (str) => "address",
          Cell: (tableInfo) => (
            <div>
              {tableInfo.row.original._employee.address.length > 10
                ? tableInfo.row.original._employee.address.slice(0, 10) + "..."
                : tableInfo.row.original._employee.address}
            </div>
          ),
        },
        {
          Header: "Salary",
          id: "salary",
          accessor: (str) => "salary",
          Cell: (tableInfo) => (
            <div>{tableInfo.row.original._employee.salary}</div>
          ),
        },
        {
          Header: "Branch",
          id: "branch",
          accessor: (str) => "branch",
          Cell: (tableInfo) => (
            <div>{tableInfo.row.original._employee.branch}</div>
          ),
        },
        {
          Header: "Action",
          id: "update",
          accessor: (str) => "update",
          Cell: (tableInfo) => (
            <div style={{ width: "220px" }}>
              <button
                style={{ width: "70px" }}
                className="btn btn-sm btn-success"
                onClick={() => {
                  let data = tableInfo.row.original;
                  this.setState({
                    employeesInfoModaleData: data,
                    showEployeesInfoModal: true,
                  });
                }}
              >
                View
              </button>
              <button
                style={{ width: "70px", marginLeft: "5px" }}
                className="btn btn-sm btn-primary"
                onClick={() => {
                  let data = tableInfo.row.original;
                  this.setState({
                    updateModalData: data,
                    showUpdateModal: true,
                  });
                }}
              >
                Update
              </button>
              <button
                style={{ width: "70px", marginLeft: "5px" }}
                className="btn btn-sm btn-danger"
                onClick={() => {
                  this.setState({
                    deleteModaleData: tableInfo.row,
                    showDeleteModal: true,
                  });
                }}
              >
                Delete
              </button>
            </div>
          ),
        },
      ],
      showUpdateModal: false,
      updateModalData: null,
      showDeleteModal: false,
      deleteModaleData: null,
      showEployeesInfoModal: false,
      employeesInfoModaleData: null,
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/admin/all-employees").then((res) => {
      this.setState({
        data: res.data.data,
        filteredData: res.data.data,
        showLoader: false,
      });
    });
  }

  handleSetData = (data) => {
    this.setState({ filteredData: data });
  };

  handelDelete = (id, index) => {
    axios("http://localhost:5000/admin/delete-employee", {
      method: "post",
      data: { id: id },
      headers: {
        "x-access-token": cookie.get("admin"),
      },
      withCredentials: true,
    }).then((res) => {
      let mydata = [...this.state.data];
      mydata.splice(index, 1);
      this.setState({
        showDeleteModal: false,
        serverMessage: res.data,
        showMessage: true,
        filteredData: mydata,
        data: mydata,
      });
    });
    setInterval(() => {
      this.setState({ showMessage: false });
    }, 2000);
  };

  render() {
    let { filteredData, columns } = this.state;
    return (
      <div style={{ background: "	rgb(248,248,248)" }}>
        <Container fluid>
          <div
            style={{
              height: "70px",
              background: "white",
              fontSize: "25px",
              lineHeight: "70px",
              paddingLeft: "15px",
              fontFamily: "Berlin Sans FB",
              marginBottom: "10px",
            }}
          >
            EMPLOYEES LIST
          </div>
          <div
            style={{
              background: "white",
              padding: "10px",
            }}
          >
            <div>
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

              {this.state.showLoader ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
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
              ) : (
                <div>
                  <Form className="mb-2" style={{ float: "right" }}>
                    <InputGroup>
                      <Search
                        data={this.state.data}
                        handleSetData={this.handleSetData}
                      />
                    </InputGroup>
                  </Form>
                  {this.state.filteredData.length ? (
                    <div>
                      <ReactTable
                        data={filteredData}
                        columns={columns}
                        defaultPageSize={10}
                        pageSize={
                          this.state.data.length > 10
                            ? 10
                            : this.state.data.length
                        }
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "block",
                        height: "100px",
                        background: "	#EFEFF0",
                        color: "black",
                        lineHeight: "100px",
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      <p>No Data Matched to Your Search </p>
                    </div>
                  )}
                </div>
              )}
              {this.state.showEployeesInfoModal ? (
                <EmployeesInfoModal
                  data={this.state.employeesInfoModaleData}
                  show={this.state.showEployeesInfoModal}
                  onHide={() => this.setState({ showEployeesInfoModal: false })}
                />
              ) : null}
              {this.state.showDeleteModal ? (
                <DeleteModal
                  data={this.state.deleteModaleData}
                  show={this.state.showDeleteModal}
                  delete_handler={(id, index) => {
                    this.handelDelete(id, index);
                  }}
                  onHide={() => this.setState({ showDeleteModal: false })}
                />
              ) : null}
              {this.state.showUpdateModal ? (
                <UpdateEmployeeModal
                  title={"Update Employee"}
                  data={this.state.updateModalData}
                  show={this.state.showUpdateModal}
                  onHide={() => this.setState({ showUpdateModal: false })}
                />
              ) : null}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
