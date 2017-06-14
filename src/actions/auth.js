// @flow
import { createActions } from 'redux-actions';

type AuthActions = {
  authenticate: (authToken: string) => Action<string>,
  logout: () => Action<void>,
};

const {
  authenticate,
  logout,
}: AuthActions = createActions({}, 'AUTHENTICATE', 'LOGOUT');

export type { AuthActions };
export {
  authenticate,
  logout,
};
