// @flow
import { combineReducers } from 'redux';

import auth from './auth';
import track from './track';

const reducer =  combineReducers({
  auth,
  track,
});

export default reducer;