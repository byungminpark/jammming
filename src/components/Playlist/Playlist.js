import React, { useCallback } from "react";
import "./Playlist.css";

import TrackList from "../TrackList/TrackList";

const Playlist = ({ playlistTracks, onRemove, onNameChange, onSave }) => {
  const handleNameChange = useCallback(
    (e) => {
      onNameChange(e.target.value);
    },
    [onNameChange]
  );

  return (
    <section className="Playlist">
      <input
        onChange={handleNameChange}
        type="text"
        defaultValue="New Playlist"
      />
      <ul>
        <TrackList
          isRemoval={true}
          tracks={playlistTracks}
          onRemove={onRemove}
        />
      </ul>
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </section>
  );
};

export default Playlist;
