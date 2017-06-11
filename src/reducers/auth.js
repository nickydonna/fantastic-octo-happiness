// @flow
import { handleActions } from 'redux-actions';

import { authenticate } from '../actions/auth';

const AUTHENTICATE = authenticate.toString();

const initialState = { authToken: 'BQDrh4ChCvmxoF3hj8dSLr8emRSByAkAutKxslqhh0kipnlvVTGu4_XSaAG1egBF444uQ7yUQ_QV5rVYGxm6jlhjFI5yN5I5_4iX6AiNNxIx4W7fetugqTEeNgmsSS6Q96rPCWbRUWjm3qGs25zDdhZAxhRcZvAC0IEH4w' };

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