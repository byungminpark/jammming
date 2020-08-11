const clientID = "e24015d70ef14a7e924e7fef127edf52";
const redirectUri = "http://localhost:3000/";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expireInMatch) {
      // 1.할당
      accessToken = tokenMatch[1];
      const expiresIn = Number(expireInMatch[1]);
      // 2.토큰 파기 예약
      setTimeout(() => (accessToken = ""), expiresIn * 1000);
      // 3.history.pushState로 현재 url 단순 변경만 하기. (현재 url의 토큰 사용을 못하게 하기 위해)  (새로고침 or 재방문시 3번째 블록으로 가서 토큰을 다시 받는다.)
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectUri}&state=123&scope=playlist-modify-private`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      const url = `https://api.spotify.com/v1/search?q=${term}&type=track&market=US&limit=20`;

      if (term === "^") {
        console.log("검색어가 잘못되었습니다; 특수문자 등");
        return new Promise(() => []);
      }

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const jsonRes = await res.json();

      if (!jsonRes.tracks) {
        console.log(
          `에러 ${jsonRes.error.status}:${jsonRes.error.message}입니다.`
        );
        return [];
      }

      if (!jsonRes.tracks.items[0]) {
        console.log("해당 검색어에 대한 검색 결과가 없습니다.");
        return [];
      }

      return jsonRes.tracks.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri,
        };
      });
    } else {
      return [];
    }
  },

  async getUserId(token) {
    const url = "https://api.spotify.com/v1/me";

    const res = await fetch(url, {
      headers: { Authorization: "Bearer " + token },
    });
    const jsonUser = await res.json();
    return jsonUser.id;
  },

  async createPlaylist(id, name, token) {
    const url = `https://api.spotify.com/v1/users/${id}/playlists`;
    const data = {
      name: name,
      description: name + " description",
      public: false,
    };
    const init = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(url, init);
    const jsonPlaylist = await res.json();
    return jsonPlaylist.id;
  },

  updatePlaylist(id, uris, token) {
    const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
    const data = { uris: uris };
    const init = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    };

    fetch(url, init)
      .then((res) => res.json())
      .then((jsonRes) => console.log("완료:", jsonRes.snapshot_id));
  },

  async savePlaylist(name, uris) {
    const accessToken = this.getAccessToken();

    const userId = await this.getUserId(accessToken); // 유저.id 가져오기
    const playlistId = await this.createPlaylist(userId, name, accessToken); // 플레이리스트 생성 + 플레이리스트.id 가져오기
    this.updatePlaylist(playlistId, uris, accessToken); // 해당 id의 플레이리스트에 uris 트랙들을 추가하기
  },
};

export default Spotify;
