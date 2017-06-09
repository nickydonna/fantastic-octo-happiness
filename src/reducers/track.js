// @flow
import { handleActions } from 'redux-actions';

import { loadTracks } from '../actions/track';

const LOAD_TRACKS = loadTracks.toString();

const initialState = { tracks: [] };

/** SELECTORS */
const getTracks = (state: State) => state.track.tracks;
/** SELECTORS */

const reducer = handleActions({
  [LOAD_TRACKS]: (state: TrackState, { payload }: Action<Track[]>) =>
    ({ ...state, tracks: payload }),
}, initialState);

export default reducer;
export {
  getTracks,
};