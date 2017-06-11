// @flow
import { combineEpics } from 'redux-observable';

import { userProfile } from '../utils/spotify';
import { getAuthToken } from '../reducers/auth';
import { getUser } from '../reducers/user';
import { loadUser } from '../actions/user';
import { formatUser } from './helpers';

const auth = (action$: rxjs$Observable<GenericAction>, store: Store): rxjs$Observable<GenericAction> => {
  const noProfile$ = action$
    .map(() => { // map to the authToken and the user
      const state = store.getState();
      return [getAuthToken(state), getUser(state)]
    })
    .filter(([authToken, user]) => !!authToken && !user) //If there is a token, and NO user
    .map(([authToken]) => authToken) // map to the token
    .take(1); // do this only once

  const loadProfile$ = noProfile$
    .mergeMap((authToken) => userProfile(authToken)) // query spotify for the profile
    .map(formatUser) // transform the response to the User type
    .map(loadUser); // dispatch LOAD_USER

  return loadProfile$;
};

export default combineEpics(
  auth,
);
