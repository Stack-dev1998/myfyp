import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import ReactTable from "../../Common/ReactTable";
import GlobalSearch from "../../Common/GlobalSearch";
import { Container, Form, InputGroup, Button } from "react-bootstrap";

const cookie = new Cookies();
export default class CompletedOrders extends Component {
  state = {
    pageSize: 3,
    employees: [],
    selectedEmployee: "",
    isLoaded: false,
    newOrders: [],
    filteredData: [],
    columns: [
      {
        Header: "#",
        accessor: "no",
        accessor: (str) => "no",
        Cell: (tableInfo) => <div>{tableInfo.row.index + 1}</div>,
      },
      {
        Header: "NeedyPersonName",
        accessor: "needyPersonName",
        accessor: (str) => "needyPersonName",
        Cell: (tableInfo) => (
          <div>{tableInfo.row.original.needyPerson.name}</div>
        ),
      },

      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "DonorName",
        accessor: "donorName",
        accessor: (str) => "donorName",
        Cell: (tableInfo) => <div>{tableInfo.row.original.donor.name}</div>,
      },
      {
        Header: "AssignedDate",
        accessor: "timeStamp",
        accessor: (str) => "timeStamp",
        Cell: (tableInfo) => <div>{tableInfo.row.original.timeStamp}</div>,
      },
      {
        Header: "Action",
        id: "update",
        accessor: (str) => "update",
        Cell: (tableInfo) => (
          <div>
            <tr>
              <td>
                <InputGroup>
                  <Form.Control
                    as="select"
                    name="select"
                    onChange={this.onChangeHandler.bind(this)}
                  >
                    <option name="choose" value="">
                      Choose...
                    </option>
                    {this.state.employees &&
                      this.state.employees.map((item) => {
                        return (
                          <option
                            name={item.name}
                            value={item._id}
                            key={item._id}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                  </Form.Control>
                  <button
                    style={{
                      width: "70px",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      this.submitHandler(tableInfo.row);
                    }}
                  >
                    Assign To
                  </button>
                </InputGroup>
              </td>
            </tr>
          </div>
        ),
      },
    ],
  };

  componentDidMount() {
    axios({
      method: "post",
      url: "http://localhost:5000/manager/new-orders",
      headers: {
        "x-access-token": cookie.get("manager"),
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      this.setState({
        employees: res.data.employees,
        filteredData: res.data.orders,
        newOrders: res.data.orders,
        isLoaded: true,
      });
    });
  }
  handleSetData = (data) => {
    this.setState({ filteredData: data });
  };
  onChangeHandler = (e) => {
    this.setState({ selectedEmployee: e.target.value });
    console.log(e.target.value);
  };
  submitHandler = (row) => {
    var orderId = row.original._id;
    var employee = this.state.selectedEmployee;
    if (employee) {
      axios({
        method: "post",
        url: "http://localhost:5000/manager/assign-order",
        data: { orderId, employee },
      }).then((res) => {
        console.log(res);
      });
    }
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
              {this.state.filteredData ? (
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
