// @flow
import { createActions } from 'redux-actions';

type UserActions = {
  searchTracks: (query: string) => Action<string>,
  loadTracks: (tracks: any[]) => Action<any[]>,
};

const {
  searchTracks,
  loadTracks,
}: UserActions = createActions({}, 'LOAD_TRACKS', 'SEARCH_TRACKS');

export type { UserActions };
export {
  searchTracks,
  loadTracks,
};
