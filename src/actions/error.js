// @flow
import { createActions } from 'redux-actions';

type ErrorActions = {
  error: (err: string | Error) => Action<string | Error>,
};

const {
  error,
}: ErrorActions = createActions({}, 'ERROR');

export type { ErrorActions };
export {
  error,
};
