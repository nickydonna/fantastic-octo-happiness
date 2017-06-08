// @flow
import { combineEpics } from 'redux-observable';

import auth from './auth';

const epic = combineEpics(
  auth,
);

export default epic;