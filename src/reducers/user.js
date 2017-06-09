// @flow
import { handleActions } from 'redux-actions';

import { loadUser } from '../actions/user';

const LOAD_USER = loadUser.toString();

const initialState = { user: undefined };

/** SELECTORS */
const getUser = (state: State) => state.user.user;
/** SELECTORS */

const reducer = handleActions({
  [LOAD_USER]: (state: AuthState, { payload }: Action<User>) =>
    ({ ...state, user: payload }),
}, initialState);

export default reducer;
export {
  getUser,
};