// @flow
import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import track from './track';

const reducer =  combineReducers({
  auth,
  user,
  track,
});

export default reducer;