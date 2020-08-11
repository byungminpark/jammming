<!-- markdownlint-disable -->

# Jammming

음원 검색과 OAuth2를 통한 사용자의 플레이리스트에 접근을 허용하는 Spotify API를 활용한 Create React App 기반 Web App이다.<br><br><br>

## 사용

1. 리다이렉트로 사용자 로그인 및 개인 정보 허용.
2. 음원 검색
3. 원하는 음원을 나만의 플레이리스트에 담기.
4. 해당 플레이리스트 내 Spotify로 전송.<br><br>

## 구조

```jsx
<Search />   // data fetch in Spotify.js
<SearchResults>
|  <Playlist />
|  <TrackList />
|  |  <Track />
```

<br>

## 참여

1. 구조 및 기능 구현 본인 작성.
2. 코드 정리는 튜토리얼 일부 참고.
3. 조금 더 복잡한 React project 구조와
   API 문서를 통한 사용자 인증 구현을 배움.
