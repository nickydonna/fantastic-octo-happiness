// @flow
import { createActions } from 'redux-actions';

type UserActions = {
  loadTracks: (tracks: any[]) => Action<any[]>,
};

const {
  loadTracks,
}: UserActions = createActions({}, 'LOAD_TRACKS');

export type { UserActions };
export {
  loadTracks,
};
