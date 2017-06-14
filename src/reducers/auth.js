// @flow
import { handleActions } from 'redux-actions';

import { authenticate, logout } from '../actions/auth';

const AUTHENTICATE = authenticate.toString();
const LOGOUT = logout.toString();

// const initialState = { authToken: 'BQCUa6A28tQIIWYdPq9YO9_61K8l9DAlb4YclbgmGDZvzVrrI0tJttbaq1OasJr-rOtMwq98gxKg5_WpV0NQkkpxLYCXLBjxkO8D7F7vyGvTwOflNUv1ZZ1kTKMruMYrTlKjhJqIP2o0rm5UTWUlGbWDQik2qzeWG_0d_A' };
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