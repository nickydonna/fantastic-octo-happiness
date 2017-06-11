// @flow
import { createActions } from 'redux-actions';

type UserActions = {
  loadTracks: (tracks: Track[]) => Action<Track[]>,
  likeTrack: (track: Track) => Action<Track>,
  trackLiked: (track: Track) => Action<Track>,
};

const {
  loadTracks,
  likeTrack,
  trackLiked,
}: UserActions = createActions({}, 'LOAD_TRACKS', 'LIKE_TRACK', 'TRACK_LIKED');

export type { UserActions };
export {
  loadTracks,
  likeTrack,
  trackLiked,
};
