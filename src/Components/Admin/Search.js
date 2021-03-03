import React from "react";
import { Form } from "react-bootstrap";

export default class GlobalSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      searchInput: "",
    };
  }

  handleChange = (event) => {
    this.setState({ searchInput: event.target.value }, () =>
      this.globalSearch()
    );
  };

  globalSearch = () => {
    let { searchInput } = this.state;

    let filteredData = this.props.data.filter((value) => {
      return value.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    this.props.handleSetData(filteredData);
  };
  render() {
    return (
      <>
        <br />
        <Form.Control
          value={this.state.searchInput || ""}
          onChange={this.handleChange}
          className="ml-1"
          type="text"
          placeholder="Search by  Name "
          size="large"
          name="searchInput"
          label="Search"
        />

        <br />
        <br />
      </>
    );
  }
}
