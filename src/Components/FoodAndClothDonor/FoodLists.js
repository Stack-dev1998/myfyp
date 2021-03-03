import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import ReactTable from "../../Common/ReactTable";
import Search from "./Search";
import UpdateFoodModal from "./UpdateFoodModal";
import DeleteFoodModal from "./DeleteFoodModal";
import { Container, Form, InputGroup, Button, Spinner } from "react-bootstrap";
const cookie = new Cookies();
export default class FoodLists extends Component {
  state = {
    pageSize: 3,
    updateModalData: "",
    showUpdateModal: false,
    showDeleteModal: false,
    deleteModaleData: null,
    showMessage: false,
    showLoader: true,
    serverMessage: "",
    data: "",
    filteredData: "",
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
        filter: "text",
      },
      {
        Header: "Address",
        id: "address",
        accessor: (str) => "address",
        Cell: (tableInfo) => (
          <div style={{ width: "120px" }}>{tableInfo.row.original.address}</div>
        ),
      },
      {
        Header: "Date",
        id: "date",
        accessor: (str) => "date",
        Cell: (tableInfo) => (
          <div style={{ width: "120px" }}>{tableInfo.row.original.date}</div>
        ),
      },
      {
        Header: "Start Time",
        id: "startTime",
        accessor: (str) => "startTime",
        Cell: (tableInfo) => (
          <div style={{ width: "80px" }}>
            {tableInfo.row.original.startTime}
          </div>
        ),
      },
      {
        Header: "End Time",
        id: "endTime",
        accessor: (str) => "endTime",
        Cell: (tableInfo) => (
          <div style={{ width: "80px" }}>{tableInfo.row.original.endTime}</div>
        ),
      },

      {
        Header: "Action",
        id: "update",
        accessor: (str) => "update",
        Cell: (tableInfo) => (
          <div style={{ width: "140px" }}>
            <button
              style={{ width: "57px" }}
              className="btn btn-sm btn-primary"
              onClick={() => {
                this.setState({
                  updateModalData: tableInfo.row.original,
                  showUpdateModal: true,
                });
              }}
            >
              Update
            </button>
            <button
              style={{ width: "57px", marginLeft: "5px" }}
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
    axios({
      method: "get",
      url: "http://localhost:5000/fc-donor/food-list",
      headers: {
        "x-access-token": cookie.get("food and cloth donor"),
      },
      withCredentials: true,
    }).then((res) => {
      this.setState({
        data: res.data.foods,
        filteredData: res.data.foods,
        showLoader: false,
      });
    });
  }

  handleSetData = (data) => {
    this.setState({ filteredData: data });
  };

  handelDelete = (id, index) => {
    axios("http://localhost:5000/fc-donor/delete-food", {
      method: "post",
      data: { id: id },
      headers: {
        "x-access-token": cookie.get("food and cloth donor"),
      },
      withCredentials: true,
    }).then((res) => {
      let mydata = [...this.state.data];
      mydata.splice(index, 1);
      this.setState({
        showDeleteModal: false,
        serverMessage: res.data.foods,
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
            FOODS LISTS
          </div>
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
                    data={this.state.filteredData}
                    columns={this.state.columns}
                    defaultPageSize={10}
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
                  <p>There is no data! </p>
                </div>
              )}
            </div>
          )}
        </Container>

        {this.state.showDeleteModal ? (
          <DeleteFoodModal
            data={this.state.deleteModaleData}
            show={this.state.showDeleteModal}
            delete_handler={(id, index) => {
              this.handelDelete(id, index);
            }}
            onHide={() => this.setState({ showDeleteModal: false })}
          />
        ) : null}

        {this.state.showUpdateModal ? (
          <UpdateFoodModal
            title={"Update Food"}
            data={this.state.updateModalData}
            show={this.state.showUpdateModal}
            onHide={() => this.setState({ showUpdateModal: false })}
          />
        ) : null}
      </div>
    );
  }
}
