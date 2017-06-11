// @flow
import { combineEpics } from 'redux-observable';
import type { Store } from 'redux';

import { getRecommendedTracks, putTrackInLibrary } from '../utils/spotify';

import { loadUser } from '../actions/user';
import { loadTracks, likeTrack, trackLiked } from '../actions/track';

import { formatTrack, getAuthToken } from './helpers';

const LOAD_USER = loadUser.toString();
const LIKE_TRACK = likeTrack.toString();

const recommedTracks = (action$: rxjs$Observable<GenericAction>, store: Store<State, GenericAction>): rxjs$Observable<GenericAction> => {
  const loadTracks$ = action$
    .filter(({ type }) => type === LOAD_USER)
    .mergeMap(() => getRecommendedTracks(getAuthToken(store)))
    .map(response => response.tracks)
    .map(items => items.map(formatTrack))
    .map(loadTracks);

  return loadTracks$;
};

const saveTrackToLibrary = (action$: rxjs$Observable<GenericAction>, store: Store<State, GenericAction>): rxjs$Observable<GenericAction> => {
  const postToLibrary$ = action$
    .filter(({ type }) => type === LIKE_TRACK)
    .mergeMap(({ payload }: Action<Track>) =>
      putTrackInLibrary(payload, getAuthToken(store))
        .mapTo(payload)
    )
    .map(track => trackLiked(track));

  return postToLibrary$;
};


export default combineEpics(
  recommedTracks,
  saveTrackToLibrary
);
