// @flow
import { combineEpics } from 'redux-observable';

import auth from './auth';
import user from './user';

const epic = combineEpics(
  auth,
  user,
);

export default epic;