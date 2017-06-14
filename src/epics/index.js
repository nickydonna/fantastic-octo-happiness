// @flow
import { combineEpics } from 'redux-observable';

import auth from './auth';
import user from './user';
import track from './track';
import error from './error';

const epic = combineEpics(
  auth,
  user,
  track,
  error,
);

export default epic;