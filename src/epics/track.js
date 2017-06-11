// @flow
import { combineEpics } from 'redux-observable';

import { searchTracks as spotifySearchTracks } from '../utils/spotify';

import { getAuthToken } from '../reducers/auth';
import { searchTracks, loadTracks } from '../actions/track';

import { formatTrack } from './helpers';

const SEARCH_TRACKS = searchTracks.toString();

const track = (action$: rxjs$Observable<GenericAction>, store: Store): rxjs$Observable<GenericAction> => {
  const loadTracks$ = action$
    .filter(({ type }) => type === SEARCH_TRACKS)
    .mergeMap(({ payload }: Action<string>) =>
      spotifySearchTracks(payload, getAuthToken(store.getState())))
    .map(response => response.tracks.items)
    .map(items => items.map(formatTrack))
    .map(loadTracks);

  return loadTracks$;
};

export default combineEpics(
  track,
);
