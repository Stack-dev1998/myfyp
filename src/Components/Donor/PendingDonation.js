import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import ReactTable from "../../Common/ReactTable";
import VerificationModal from "./VerificationModal";
import GlobalSearch from "../../Common/GlobalSearch";
import { Form, InputGroup, Button, Container } from "react-bootstrap";

const cookie = new Cookies();
export default class pendingDonation extends Component {
  state = {
    showVerifyModal: false,
    pendingOrders: [],
    filteredData: [],
    columns: [
      {
        Header: "#",
        accessor: "id",
        accessor: (str) => "no",
        Cell: (tableInfo) => <div>{tableInfo.row.index + 1}</div>,
      },
      {
        Header: "PoorPersonName",
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
        Header: "DonatedAt",
        accessor: (str) => "timeStamp",
        Cell: (tableInfo) => <div>{tableInfo.row.original.timeStamp}</div>,
      },

      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Action",
        id: "update",
        accessor: (str) => "update",
        Cell: (row) => (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              this.setState({ showVerifyModal: true });
            }}
          >
            Verify
          </button>
        ),
      },
    ],
  };

  componentDidMount() {
    axios({
      method: "post",
      url: "http://localhost:5000/donor/pending-orders",
      headers: {
        "x-access-token": cookie.get("donor"),
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      this.setState({
        pendingOrders: res.data.orders,
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
            COMPLETED DONATIONS
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
                    data={this.state.pendingOrders}
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

        <VerificationModal
          title={"Verification Menu"}
          show={this.state.showVerifyModal}
          onHide={() => this.setState({ showVerifyModal: false })}
        />
      </div>
    );
  }
}
