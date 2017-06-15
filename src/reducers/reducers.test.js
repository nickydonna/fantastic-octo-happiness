import reducers from './index';

import { authenticate, logout } from '../actions/auth';
import { loadTracks, recommendTracks, trackLiked } from '../actions/track';
import tracks from '../fixtures/tracks';

const [trackOne, trackTwo] = tracks;
const initialState = {
  auth: {},
  track: {
    tracks: [],
    tracksById: {},
    loading: true
  }
};

describe('auth reducers', () => {
  it('should set the token', () => {
    const action = authenticate('token')
    const state = reducers(initialState, action);
    expect(state).toEqual({ ...initialState, auth: { authToken: 'token' } });
  });

  it('should set the token', () => {
    const action = logout();
    const state = reducers(initialState, action);
    expect(state).toEqual(initialState);
  });
});

describe('track reducer', () => {
  it('should load tracks', () => {
    const action = loadTracks(tracks);
    const state = reducers(initialState, action);
    expect(state).toEqual({
      ...initialState,
      track: {
        tracks: [trackOne.id, trackTwo.id],
        tracksById: {
          [trackOne.id]: trackOne,
          [trackTwo.id]: trackTwo,
        },
        loading: false,
      }
    });
  });

  it('should set loading true', () => {
    const action = recommendTracks();
    const initialStateWithTracks = {
      ...initialState,
      track: {
        tracks: [trackOne.id, trackTwo.id],
        tracksById: {
          [trackOne.id]: trackOne,
          [trackTwo.id]: trackTwo,
        },
        loading: false,
      }
    }
    const state = reducers(initialStateWithTracks, action);
    expect(state.track.loading).toEqual(true);
  });

  it('should set liked to true', () => {
    const action = trackLiked(trackOne);
    const initialStateWithTracks = {
      ...initialState,
      track: {
        tracks: [trackOne.id, trackTwo.id],
        tracksById: {
          [trackOne.id]: trackOne,
          [trackTwo.id]: trackTwo,
        },
        loading: false,
      }
    }
    const state = reducers(initialStateWithTracks, action);
    expect(state.track.tracksById[trackOne.id].liked).toEqual(true);
  });
});