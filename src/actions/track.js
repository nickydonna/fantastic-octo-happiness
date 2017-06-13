// @flow
import { createActions } from 'redux-actions';

type UserActions = {
  loadTracks: (tracks: Track[]) => Action<Track[]>,
  likeTrack: (track: Track) => Action<Track>,
  trackLiked: (track: Track) => Action<Track>,
  recommendTracks: () => Action<void>,
};

const {
  loadTracks,
  likeTrack,
  trackLiked,
  recommendTracks,
}: UserActions = createActions({}, 'LOAD_TRACKS', 'LIKE_TRACK', 'TRACK_LIKED', 'RECOMMEND_TRACKS');

export type { UserActions };
export {
  loadTracks,
  likeTrack,
  trackLiked,
  recommendTracks,
};
