// @flow
import { handleActions } from 'redux-actions';

import { authenticate } from '../actions/auth';

const AUTHENTICATE = authenticate.toString();

const initialState = { authToken: 'BQB5YCZ52bagqIxghsLK12636JTyJIoHK6-92eouge83aL--qczL2M177FKYPM-BNp2B73wLxSl_IW_0ys9LPCYVJkJoocYHJUGuppIWLIAqAdVv-DBPmYL9tkXyfKzAm0ryfp4FKAr7NUaKaAFj-a_az2PXCPOJ0oyFeA' };

/** SELECTORS */
const getAuthToken = (state: State) => state.auth.authToken;
/** SELECTORS */

const reducer = handleActions({
  [AUTHENTICATE]: (state: AuthState, { payload }: Action<string>) =>
    ({ ...state, authToken: payload }),
}, initialState);

export default reducer;
export {
  getAuthToken,
};