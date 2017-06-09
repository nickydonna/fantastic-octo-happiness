// @flow
import request from 'superagent'
import observify from 'superagent-rxjs'

// mutates superagent's Request.prototype and adds the .observify() method to it
observify(request);

const url = (path: string) =>  `https://api.spotify.com/v1/${path}`;
const get = (url: string, authToken: string) => 
  request.get(url)
    .set('Authorization', `Bearer ${authToken}`)
    .set('Accept', 'application/json')
    .observify()
    .map(response => response.body);

const userProfile = (authToken: string) => get(url('me'), authToken);
const userTracks = (authToken: string) => get(url('me/tracks'), authToken);
const searchTracks = (query: string, authToken: string) => get(url(`search?q=${query}&type=track`), authToken);


export {
  userProfile,
  userTracks,
  searchTracks,
};