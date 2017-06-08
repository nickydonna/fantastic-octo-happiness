// @flow
import qs from 'qs';
import { last } from 'lodash';

const clientId = '89b92773702c4e36a8014a880e7a9b7d';
const redirectUri = encodeURIComponent('http://localhost:3000/login');
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;

// hash is the hash value staring with #, i.e.: #access_token=...
const parseHash = (hash: string): string => {
  const strippedHash = last(hash.split('#'));
  const { access_token } = qs.parse(strippedHash);
  return access_token;
} 

export {
  authUrl,
  parseHash,
};