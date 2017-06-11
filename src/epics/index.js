// @flow
import { combineEpics } from 'redux-observable';

import auth from './auth';
import user from './user';
import track from './track';

const epic = combineEpics(
  auth,
  user,
  track,
);

export default epic;