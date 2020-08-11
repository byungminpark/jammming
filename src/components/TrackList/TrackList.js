import React from "react";
import "./TrackList.css";

import Track from "../Track/Track";

const TrackList = (props) => {
  return (
    <ul className="TrackList">
      {props.tracks.map((track) => {
        return (
          <Track
            key={track.id}
            track={track}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            isRemoval={props.isRemoval}
          />
        );
      })}
    </ul>
  );
};

export default TrackList;
