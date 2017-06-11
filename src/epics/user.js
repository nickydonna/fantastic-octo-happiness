// @flow
import { combineEpics } from 'redux-observable';
import type { Store } from 'redux';

import { userProfile } from '../utils/spotify';
import { getUser } from '../reducers/user';
import { loadUser } from '../actions/user';
import { formatUser, getAuthToken } from './helpers';

const auth = (action$: rxjs$Observable<GenericAction>, store: Store<State, GenericAction>): rxjs$Observable<GenericAction> => {
  const loadProfile$ = action$
    .map(() => [getAuthToken(store), getUser(store.getState())]) // map to the authToken and the user
    .filter(([authToken, user]) => !!authToken && !user) //If there is a token, and NO user
    .take(1) // do this only once
    .mergeMap(([authToken]) => userProfile(authToken)) // query spotify for the profile
    .map(formatUser) // transform the response to the User type
    .map(loadUser); // dispatch LOAD_USER

  return loadProfile$;
};

export default combineEpics(
  auth,
);
