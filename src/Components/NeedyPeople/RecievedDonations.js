import React, { Component } from "react";
import { Form, Button, InputGroup, Container } from "react-bootstrap";
import ReactTable from "../../Common/ReactTable";
import Search from "./Search";
export default class RecievedDonations extends Component {
  state = {
    data: [
      {
        id: 1,
        donorName: "ali",
        amount: "2000",
        recievedTime: "12/12/2019",
        status: <p style={{ color: "green" }}>Recieved</p>,
      },
      {
        id: 2,
        donorName: "ali",
        amount: "2000",
        recievedTime: "12/12/2019",
        status: <p style={{ color: "green" }}>Recieved</p>,
      },
      {
        id: 3,
        donorName: "ali",
        amount: "2000",
        recievedTime: "12/12/2019",
        status: <p style={{ color: "green" }}>Recieved</p>,
      },
      {
        id: 4,
        donorName: "ali",
        amount: "2000",
        recievedTime: "12/12/2019",
        status: <p style={{ color: "green" }}>Recieved</p>,
      },
    ],
    filteredData: [
      {
        id: 1,
        donorName: "ali",
        amount: "2000",
        recievedTime: "12/12/2019",
        status: <p style={{ color: "green" }}>Recieved</p>,
      },
      {
        id: 2,
        donorName: "ali",
        amount: "2000",
        recievedTime: "12/12/2019",
        status: <p style={{ color: "green" }}>Recieved</p>,
      },
      {
        id: 3,
        donorName: "ali",
        amount: "2000",
        recievedTime: "12/12/2019",
        status: <p style={{ color: "green" }}>Recieved</p>,
      },
      {
        id: 4,
        donorName: "ali",
        amount: "2000",
        recievedTime: "12/12/2019",
        status: <p style={{ color: "green" }}>Recieved</p>,
      },
    ],
    columns: [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "DonorName",
        accessor: "donorName",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },

      {
        Header: "RecievedTime",
        accessor: "recievedTime",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
  };
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
            Recieved Donations
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
                  <Search
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
                  pageSize={
                    this.state.data.length > 10 ? 10 : this.state.data.length
                  }
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
