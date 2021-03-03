import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import ReactTable from "../../Common/ReactTable";
import Search from "./Search";
import UpdateClothModal from "./UpdateCloth";
import DeleteClothModal from "./DeleteClothModal";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
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
        Header: "Contact#",
        id: "contactNo",
        accessor: (str) => "contactNo",
        Cell: (tableInfo) => (
          <div style={{ width: "80px" }}>
            {tableInfo.row.original.contactNo}
          </div>
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
        Header: "Description",
        id: "description",
        accessor: (str) => "description",
        Cell: (tableInfo) => (
          <div style={{ width: "80px" }}>
            {tableInfo.row.original.description}
          </div>
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
      url: "http://localhost:5000/fc-donor/cloth-list",
      headers: {
        "x-access-token": cookie.get("food and cloth donor"),
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      this.setState({
        data: res.data.cloths,
        filteredData: res.data.cloths,
        showLoader: false,
      });
    });
  }
  handleSetData = (data) => {
    this.setState({ filteredData: data });
  };
  handelDelete = (id, index) => {
    axios("http://localhost:5000/fc-donor/delete-cloth", {
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
            CLOTHS LISTS
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
        {this.state.showDeleteModal ? (
          <DeleteClothModal
            data={this.state.deleteModaleData}
            show={this.state.showDeleteModal}
            delete_handler={(id, index) => {
              this.handelDelete(id, index);
            }}
            onHide={() => this.setState({ showDeleteModal: false })}
          />
        ) : null}

        {this.state.showUpdateModal ? (
          <UpdateClothModal
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
