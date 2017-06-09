// @flow
import { createActions } from 'redux-actions';

type UserActions = {
  loadUser: (user: User) => Action<User>,
};

const {
  loadUser,
}: UserActions = createActions({}, 'LOAD_USER');

export type { UserActions };
export {
  loadUser,
};
