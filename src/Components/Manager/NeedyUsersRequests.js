import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import ReactTable from "../../Common/ReactTable";
import GlobalSearch from "../../Common/GlobalSearch";
import ApproveModal from "./ApproveModal";
import DeleteModal from "./DeleteModal";
import { InputGroup, Spinner, Container, Form, Alert } from "react-bootstrap";
const cookie = new Cookies();
export default class NeedyUsersRequests extends Component {
  state = {
    pageSize: 3,
    showLoader: true,
    data: [],
    filteredData: [],
    showDeleteModal: false,
    deleteModaleData: null,
    showApproveModal: false,
    approveModaleData: null,
    serverMessage: null,
    showMessage: false,
    columns: [
      {
        Header: "#",
        accessor: (str) => "no",
        Cell: (tableInfo) => <div>{tableInfo.row.index + 1}</div>,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "F.Name",
        accessor: (str) => "fatherName",
        Cell: (tableInfo) => (
          <div>{tableInfo.row.original._needyPerson.fatherName}</div>
        ),
      },
      {
        Header: "ConactNo",
        accessor: (str) => "contactNo",
        Cell: (tableInfo) => (
          <div>{tableInfo.row.original._needyPerson.contactNo}</div>
        ),
      },
      {
        Header: "City",
        accessor: (str) => "city",
        Cell: (tableInfo) => (
          <div>{tableInfo.row.original._needyPerson.city}</div>
        ),
      },
      {
        Header: "Detail",
        accessor: (str) => "detail",
        Cell: (tableInfo) => (
          <div style={{ minWidth: "300px", textAlign: "justify" }}>
            {tableInfo.row.original._needyPerson.detail.slice(0, 200) + "..."}
          </div>
        ),
      },
      {
        Header: "Action",
        id: "update",
        accessor: (str) => "update",
        Cell: (tableInfo) => (
          <div style={{ width: "80px" }}>
            <button
              style={{ width: "70px", marginTop: "5px", marginLeft: "5px" }}
              className="btn btn-sm btn-primary"
              onClick={() => {
                this.setState({
                  approveModaleData: tableInfo.row,
                  showApproveModal: true,
                });
              }}
            >
              Approve
            </button>
            <button
              style={{ width: "70px", marginTop: "5px", marginLeft: "5px" }}
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
  };
  componentDidMount() {
    axios("http://localhost:5000/manager/needy-people-requests", {
      method: "post",
      headers: {
        "x-access-token": cookie.get("manager"),
      },

      withCredentials: true,
    }).then((res) => {
      console.log(res);
      this.setState({
        data: res.data,
        filteredData: res.data,
        showLoader: false,
      });
    });
  }
  handleSetData = (data) => {
    this.setState({ filteredData: data });
  };

  handelDelete = (id, index) => {
    axios("http://localhost:5000/manager/delete-needy-people-request", {
      method: "post",
      data: { id: id },
      headers: {
        "x-access-token": cookie.get("manager"),
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
  handelApprove = (id, index) => {
    axios("http://localhost:5000/manager/approve-needy-people-request", {
      method: "post",
      data: { id: id },
      headers: {
        "x-access-token": cookie.get("manager"),
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
            NEEDY USERS REQUESTS
          </div>
          <div
            style={{
              background: "white",
              padding: "10px",
            }}
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
                    <GlobalSearch
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
          </div>
        </Container>
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
        {this.state.showApproveModal ? (
          <ApproveModal
            data={this.state.approveModaleData}
            show={this.state.showApproveModal}
            delete_handler={(id, index) => {
              this.handelApprove(id, index);
            }}
            onHide={() => this.setState({ showApproveModal: false })}
          />
        ) : null}
      </div>
    );
  }
}
