// @flow
import { uniq, fromPairs } from 'lodash';
import { handleActions } from 'redux-actions';

import { loadTracks, trackLiked } from '../actions/track';

const LOAD_TRACKS = loadTracks.toString();
const TRACK_LIKED = trackLiked.toString();

const initialState = {
  tracks: [],
  tracksById: {},
};

/** SELECTORS */
const getTracks = (state: State): Track[] => {
  const { tracks, tracksById } = state.track;
  return tracks.map(id => tracksById[id]);
};
/** SELECTORS */

const reducer = handleActions({
  [LOAD_TRACKS]: (state: TrackState, { payload }: Action<Track[]>) => {
    const tracks = uniq([
      ...state.tracks,
      ...payload.map(p => p.id),
    ])
    const tracksById = {
      ...state.tracksById,
      ...fromPairs(payload.map(p => [p.id, p])),
    };
    return { ...state, tracks, tracksById };
  },
  [TRACK_LIKED]: (state: TrackState, { payload }: Action<Track>) => {
    const { id } = payload;
    const track = {
      ...state.tracksById[id],
      liked: true,
    };
    const tracksById = {
      ...state.tracksById,
      [id]: track,
    }
    return { ...state, tracksById };
  },
}, initialState);

export default reducer;
export {
  getTracks,
};