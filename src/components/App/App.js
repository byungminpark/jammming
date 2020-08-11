import React from "react";
import "./App.css";

import Search from "../Search/Search";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import Spotify from "../../util/Spotify";

// 더미 데이터
// const track0 = {
//   name:   "Creep",
//   artist: "Radiohead",
//   album:  "Pablo Honey",
//   id:     14171,
//   uri:    446468
// };
// const track1 = {
//   name:   "Songbird",
//   artist: "Oasis",
//   album:  "DT",
//   id:     21212,
//   uri:    346468
// };
// const track2 = {
//   name:   "Mind",
//   artist: "SOAD",
//   album:  "Hyposis",
//   id:     94121,
//   uri:    246468
// };
// const track3 = {
//   name:   "Break Stuff",
//   artist: "Limp Bizkit",
//   album:  "Break Stuff",
//   id:     14121,
//   uri:    146468
// };
// const trackList = [track0,track1,track2,track3];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: "New Playlist",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);

    this.savePlaylist = this.savePlaylist.bind(this);

    this.search = this.search.bind(this);
  }

  search(searchTerm) {
    // Spotify.search 실행
    Spotify.search(searchTerm).then((trackList) => {
      this.setState({ searchResults: trackList });
    });
  }

  addTrack(track) {
    if (
      !this.state.playlistTracks.find(
        (savedTrack) => savedTrack.id === track.id
      )
    ) {
      const tracks = this.state.playlistTracks;
      tracks.push(track);

      this.setState({ playlistTracks: tracks });
    } else {
      console.log("이미 추가된 트랙입니다.");
    }
  }

  removeTrack(track) {
    const tracks = this.state.playlistTracks;
    tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const playlistName = this.state.playlistName;
    const playlistTracks = this.state.playlistTracks;

    if (!playlistName || !playlistTracks.length) {
      console.log("플레이리스트에 트랙을 넣거나 이름을 지정하세요.");
      return;
    }

    const uris = playlistTracks.map((track) => track.uri);

    Spotify.savePlaylist(playlistName, uris) // 비동기 savePlaylist 호출
      .then(() => {
        this.setState({ playlistTracks: [] }); // 플레이리스트 리셋
      });
  }

  render() {
    return (
      <>
        <header>
          <h1>
            Jass<span className="highlight">mm</span>ing
          </h1>
          <h1>{this.state.playlistName}</h1>
        </header>

        <main className="App">
          <Search onSearch={this.search} />
          <div className="App-contents">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;
