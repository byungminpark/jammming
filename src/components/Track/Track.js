import React, { useCallback } from "react";
import "./Track.css";

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const addTrack = useCallback(() => {
    onAdd(track);
  }, [track, onAdd]);

  const removeTrack = useCallback(() => {
    onRemove(track);
  }, [track, onRemove]);

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button className="Track-action minus" onClick={removeTrack}></button>
      );
    } else {
      return <button className="Track-action plus" onClick={addTrack}></button>;
    }
  };

  return (
    <li className="Track">
      <div className="Track-info">
        <h3>{track.name}</h3>
        <span>
          {track.artist} | {track.album}
        </span>
      </div>
      {renderAction()}
    </li>
  );
};

export default Track;
