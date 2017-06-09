// @flow
import qs from 'qs';
import { last } from 'lodash';

const scopeArray = [
  'user-library-read',
  'user-read-email',
  'user-library-modify',
];
const scopes = encodeURIComponent(scopeArray.join(' '));
const clientId = '89b92773702c4e36a8014a880e7a9b7d';
const redirectUri = encodeURIComponent('http://localhost:3000/login');
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;

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