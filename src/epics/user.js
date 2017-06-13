// @flow
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import type { Store } from 'redux';

import { getUserProfile } from '../utils/spotify';
import { getUser } from '../reducers/user';
import { error } from '../actions/error';
import { loadUser } from '../actions/user';
import { formatUser, getAuthToken } from './helpers';

const auth = (action$: rxjs$Observable<GenericAction>, store: Store<State, GenericAction>): rxjs$Observable<GenericAction> => {
  const loadProfile$ = action$
    .map(() => [getAuthToken(store), getUser(store.getState())]) // map to the authToken and the user
    .filter(([authToken, user]) => !!authToken && !user) //If there is a token, and NO user
    .take(1) // do this only once
    .mergeMap(([authToken]) => getUserProfile(authToken)) // query spotify for the profile
    .map(formatUser) // transform the response to the User type
    .map(loadUser) // dispatch LOAD_USER
    .catch(e => Observable.of(error(e)))

  return loadProfile$;
};

export default combineEpics(
  auth,
);
