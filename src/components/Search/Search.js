import React from "react";
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleTermChange(e) {
    const userInput = e.target.value;
    this.setState({ input: userInput });
  }

  search(e) {
    this.props.onSearch(this.state.input);
  }

  render() {
    return (
      <section className="Search">
        <input
          type="text"
          placeholder="Enter A Song, Album, or Artist"
          value={this.state.input}
          onChange={this.handleTermChange}
        />
        <button onClick={this.search}>SEARCH</button>
      </section>
    );
  }
}

export default Search;
