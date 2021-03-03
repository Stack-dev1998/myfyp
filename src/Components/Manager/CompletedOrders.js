import React, { Component } from "react";
import axios from "axios";
import ReactTable from "../../Common/ReactTable";
import GlobalSearch from "../../Common/GlobalSearch";
import { Container, Form, InputGroup } from "react-bootstrap";

export default class CompletedOrders extends Component {
  state = {
    pageSize: 3,
    completedOrders: [],
    filteredData: [],
    columns: [
      {
        Header: "#",
        accessor: "no",
      },
      {
        Header: "PoorPersonName",
        accessor: "name",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "AssignedTo",
        accessor: "assignedTo",
      },
      {
        Header: "AssignedDate",
        accessor: "assignedDate",
        width: 300,
      },
      {
        Header: "Action",
        id: "update",
        accessor: (str) => "update",
        Cell: (tableInfo) => (
          <div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                let mydata = [...this.state.completedOrders];
                mydata.splice(tableInfo.row.index, 1);
                this.setState({
                  filteredData: mydata,
                  completedOrders: mydata,
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
    axios({
      method: "post",
      url: "http://localhost:5000/manager/completed-orders",
    }).then((res) => {
      this.setState({
        completedOrders: res.data.orders,
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
            COMPLETED ORDERS
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
                    data={this.state.data}
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
      </div>
    );
  }
}
