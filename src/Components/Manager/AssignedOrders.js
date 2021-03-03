import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import ReactTable from "../../Common/ReactTable";
import GlobalSearch from "../../Common/GlobalSearch";
import { Container, Form, InputGroup } from "react-bootstrap";
import UpdateModal from "./UpdateModal";

const cookie = new Cookies();
export default class AssignedOrders extends Component {
  state = {
    pageSize: 3,
    showUpdateModal: false,
    updateData: "",
    filteredData: [],
    assignedOrders: [],
    columns: [
      {
        Header: "#",
        accessor: "no",
        accessor: (str) => "no",
        Cell: (tableInfo) => <div>{tableInfo.row.index + 1}</div>,
      },
      {
        Header: "PoorPersonName",
        accessor: "needyPersonName",
        accessor: (str) => "needyPersonName",
        Cell: (tableInfo) => (
          <div>{tableInfo.row.original.needyPerson.name}</div>
        ),
      },
      {
        Header: "DonorName",
        accessor: "donorName",
        accessor: (str) => "donorName",
        Cell: (tableInfo) => <div>{tableInfo.row.original.donor.name}</div>,
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "AssignedTo",
        accessor: "assignedTo",
        accessor: (str) => "assignedTo",
        Cell: (tableInfo) => <div>{tableInfo.row.original.employee.name}</div>,
      },
      {
        Header: "AssignedDate",
        accessor: "timeStamp",
        accessor: (str) => "timeStamp",
        Cell: (tableInfo) => <div>{tableInfo.row.original.timeStamp}</div>,
      },
    ],
  };
  componentDidMount() {
    axios({
      method: "post",
      url: "http://localhost:5000/manager/assigned-orders",
      headers: {
        "x-access-token": cookie.get("manager"),
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      this.setState({
        assignedOrders: res.data.orders,
        filteredData: res.data.orders,
      });
    });
  }
  handleSetData = (data) => {
    this.setState({ filteredData: data });
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
            ASSIGNED ORDERS
          </div>
          <div
            style={{
              background: "white",
              padding: "10px",
            }}
          >
            <div>
              <Form className="mb-2" style={{ float: "right" }}>
                <InputGroup>
                  <GlobalSearch
                    data={this.state.assignedOrders}
                    handleSetData={this.handleSetData}
                  />
                </InputGroup>
              </Form>
              {this.state.filteredData.length ? (
                <ReactTable
                  data={filteredData}
                  columns={columns}
                  defaultPageSize={10}
                />
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
              <UpdateModal
                title={"Update Assigned Order"}
                data={this.state.updateData}
                show={this.state.showUpdateModal}
                onHide={() => this.setState({ showUpdateModal: false })}
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
