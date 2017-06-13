// @flow
/**
 * ATTENTION
 * REASON FOR SUPERAGENT: Event though RxJS has an ajax library, it sends the X-Requested-With Header
 * that spotify doesn't allow CORS, so we have to use another library
 * REASON FOR authToken optional (authToken?: string): flow doesn't support changing types when filtering
 * so and array (or observable) of type Array<?number>, will be of the same type even after a filter function
 * example:
 *  const arr = [1, 2, undefined, 4, undefined]; // Array<?number>
 *  const filtered = arr.filter(n => !!n) // Should be Array<number> but its Array<?number>
 *  const sum = filtered.reduce((acc, a) => `${acc} ${a}`, ''); // This will have a flow error
 * 
 * It should be fixed eventually see: https://github.com/facebook/flow/issues/1414
 */
import _ from 'lodash';
import request from 'superagent'
import observify from 'superagent-rxjs'
import qs from 'qs';
import { last } from 'lodash';

// mutates superagent's Request.prototype and adds the .observify() method to it
observify(request);

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
};

const url = (path: string = '') => `https://api.spotify.com/v1${path}`;
const get = (url: string, authToken?: string = ''): rxjs$Observable<any> =>
  request.get(url)
    .set('Authorization', `Bearer ${authToken}`)
    .set('Accept', 'application/json')
    .observify()
    .map(response => response.body);

const put = (url: string, body: any, authToken?: string = '') =>
  request.put(url)
    .send(body)
    .set('Authorization', `Bearer ${authToken}`)
    .set('Accept', 'application/json')
    .observify()
    .map(response => response.body);

const getUserProfile = (authToken?: string) => get(url('/me'), authToken);

const getRecommendedTracks = (authToken?: string) => {
  return get(url('/recommendations/available-genre-seeds'), authToken)
    .map(({ genres }: { genres: string[] }) =>
      _(genres).shuffle().take(5).value().join(','))
    .mergeMap((genres: string) =>
      get(url(`/recommendations?seed_genres=${genres}&limit=100`), authToken));
};

const putTrackInLibrary = ({ id }: Track, authToken?: string) =>
  put(url('/me/tracks'), { ids: [id] }, authToken);

export {
  url,
  authUrl,
  parseHash,
  getUserProfile,
  getRecommendedTracks,
  putTrackInLibrary,
};