// @flow
import { combineEpics } from 'redux-observable';
import type { Store } from 'redux';

import { getRecommendedTracks } from '../utils/spotify';

import { loadUser } from '../actions/user';
import { loadTracks } from '../actions/track';

import { formatTrack, getAuthToken } from './helpers';

const LOAD_USER = loadUser.toString();

const track = (action$: rxjs$Observable<GenericAction>, store: Store<State, GenericAction>): rxjs$Observable<GenericAction> => {
  const loadTracks$ = action$
    .filter(({ type }) => type === LOAD_USER)
    .mergeMap(() => getRecommendedTracks(getAuthToken(store)))
    .map(response => response.tracks)
    .map(items => items.map(formatTrack))
    .map(loadTracks);

  return loadTracks$;
};

export default combineEpics(
  track,
);
