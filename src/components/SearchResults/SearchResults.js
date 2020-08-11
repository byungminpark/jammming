import React from "react";
import "./SearchResults.css";

import TrackList from "../TrackList/TrackList";

const SearchResults = (props) => {
  return (
    <section className="SearchResults">
      <h2>Results</h2>

      <TrackList
        isRemoval={false}
        tracks={props.searchResults}
        onAdd={props.onAdd}
      />
    </section>
  );
};

export default SearchResults;
