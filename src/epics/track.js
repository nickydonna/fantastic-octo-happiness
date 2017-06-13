// @flow
import { combineEpics } from 'redux-observable';
import type { Store } from 'redux';
import { Observable } from 'rxjs';

import { getRecommendedTracks, putTrackInLibrary } from '../utils/spotify';

import { error } from '../actions/error';
import { loadUser } from '../actions/user';
import { loadTracks, likeTrack, trackLiked, recommendTracks } from '../actions/track';

import { formatTrack, getAuthToken } from './helpers';

const LOAD_USER = loadUser.toString();
const LIKE_TRACK = likeTrack.toString();
const RECOMMEND_TRACKS = recommendTracks.toString();

const recommendRandomTracks = (action$: rxjs$Observable<GenericAction>, store: Store<State, GenericAction>): rxjs$Observable<GenericAction> => {
  const loadTracks$ = action$
    .filter(({ type }) => type === LOAD_USER || type === RECOMMEND_TRACKS) // if LOAD_USER or RECOMMEND_TRACKS action 
    .mergeMap(() => getRecommendedTracks(getAuthToken(store))) // get Recommended Tracks from spotify
    .map(response => response.tracks)
    .map(items => items.map(formatTrack)) // format tracks
    .map(loadTracks) // dispatch LOAD_TRACKS
    .catch(e => Observable.of(error(e)));  // dispatch ERROR

  return loadTracks$;
};

const saveTrackToLibrary = (action$: rxjs$Observable<GenericAction>, store: Store<State, GenericAction>): rxjs$Observable<GenericAction> => {
  const postToLibrary$ = action$
    .filter(({ type }) => type === LIKE_TRACK ) // if LOAD_USER action
    .mergeMap(({ payload }: Action<Track>) =>
      putTrackInLibrary(payload, getAuthToken(store)) // PUT to the spotity API
        .mapTo(payload) // We need the payload for the action so we map to it
    )
    .map(track => trackLiked(track)) // dispatch TRACK_LIKED
    .catch(e => Observable.of(error(e))); // dispatch ERROR

  return postToLibrary$;
};


export default combineEpics(
  recommendRandomTracks,
  saveTrackToLibrary
);
