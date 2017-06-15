// @flow
import { combineEpics } from 'redux-observable';

import auth from './auth';
import track from './track';
import error from './error';

const epic = combineEpics(
  auth,
  track,
  error,
);

export default epic;