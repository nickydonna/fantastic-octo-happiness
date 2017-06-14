// @flow
import { handleActions } from 'redux-actions';

import { authenticate, logout } from '../actions/auth';

const AUTHENTICATE = authenticate.toString();
const LOGOUT = logout.toString();

const initialState = { authToken: undefined };

/** SELECTORS */
const getAuthToken = (state: State) => state.auth.authToken;
/** SELECTORS */

const reducer = handleActions({
  [AUTHENTICATE]: (state: AuthState, { payload }: Action<string>) =>
    ({ ...state, authToken: payload }),
  [LOGOUT]: (state: AuthState) =>
    ({ ...state, authToken: undefined }),
}, initialState);

export default reducer;
export {
  getAuthToken,
};