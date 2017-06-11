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
import request from 'superagent'
import observify from 'superagent-rxjs'

// mutates superagent's Request.prototype and adds the .observify() method to it
observify(request);

const url = (path: string) =>  `https://api.spotify.com/v1/${path}`;
const get = (url: string, authToken?: string = ''): rxjs$Observable<any> => 
  request.get(url)
    .set('Authorization', `Bearer ${authToken}`)
    .set('Accept', 'application/json')
    .observify()
    .map(response => response.body);

const userProfile = (authToken?: string) => get(url('me'), authToken);
const userTracks = (authToken?: string) => get(url('me/tracks'), authToken);
const searchTracks = (query: string, authToken?: string) => get(url(`search?q=${query}&type=track`), authToken);


export {
  userProfile,
  userTracks,
  searchTracks,
};