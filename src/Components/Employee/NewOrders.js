import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import ReactTable from "../../Common/ReactTable";
import GlobalSearch from "../../Common/GlobalSearch";
import CompleteModal from "./completeOrderModal";
import { Container, Form, InputGroup } from "react-bootstrap";

const cookie = new Cookies();
export default class NewOrders extends Component {
  state = {
    pageSize: 3,
    filteredData: [],
    showCompleteModal: false,
    completeData: "",
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
      {
        Header: "Action",
        accessor: "action",
        accessor: (str) => "action",
        Cell: (tableInfo) => (
          <div>
            {" "}
            <button
              style={{
                width: "70px",
                marginTop: "5px",
                marginLeft: "5px",
              }}
              className="btn btn-sm btn-primary"
              onClick={() => {
                this.setState({
                  completeData: tableInfo.row.original,
                  showCompleteModal: true,
                });
              }}
            >
              Compplete
            </button>
          </div>
        ),
      },
    ],
  };
  componentDidMount() {
    axios({
      method: "post",
      url: "http://localhost:5000/employee/new-orders",
      headers: {
        "x-access-token": cookie.get("employee"),
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      this.setState({
        NewOrders: res.data.orders,
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
            NEW ORDERS
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
            </div>
          </div>
        </Container>
        {this.state.showCompleteModal ? (
          <CompleteModal
            data={this.state.completeData}
            show={this.state.showCompleteModal}
            onHide={() => this.setState({ showCompleteModal: false })}
          />
        ) : null}
      </div>
    );
  }
}
