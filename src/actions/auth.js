// @flow
import { createActions } from 'redux-actions';

type AuthActions = {
  authenticate: (authToken: string) => Action<string>,
};

const {
  authenticate,
}: AuthActions = createActions({}, 'AUTHENTICATE');

export type { AuthActions };
export {
  authenticate,
};
