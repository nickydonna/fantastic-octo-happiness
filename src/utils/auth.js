// @flow

const clientId = '89b92773702c4e36a8014a880e7a9b7d';
const redirectUri = encodeURIComponent('http://localhost:3000');
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;

export {
  authUrl,
};