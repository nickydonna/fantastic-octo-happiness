// @flow
import { handleActions } from 'redux-actions';

import { authenticate } from '../actions/auth';

const AUTHENTICATE = authenticate.toString();

const initialState = { authToken: 'BQB3IMRtpnGwLsU02ATFwT0hbnmgy_JEaiZhfkaw3Qh9yufX_W8KxTrqO2kxNVkAGgwLzY2DvPTtTdvxkto2Fg4E4vaHFzDCJqjNZ2gw0mJyXgMQbCqIgNHqSXKkIP0byK-rpcqt34KXkr3y_Em3t4Y6QQdS2siweNjrHA' };

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