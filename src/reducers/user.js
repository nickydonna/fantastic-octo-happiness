// @flow
import { handleActions } from 'redux-actions';

import { loadUser } from '../actions/user';

const LOAD_USER = loadUser.toString();

const initialState = { user: undefined, loading: true };

/** SELECTORS */
const getUser = (state: State) => state.user.user;
const getLoading = (state: State) => state.user.loading;
/** SELECTORS */

const reducer = handleActions({
  [LOAD_USER]: (state: AuthState, { payload }: Action<User>) =>
    ({ ...state, user: payload, loading: false }),
}, initialState);

export default reducer;
export {
  getUser,
  getLoading,
};