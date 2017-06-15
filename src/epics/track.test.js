/**
 * See the README#Superagent to understand the need for timeout
 */
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import nock from 'nock';

import { timeout } from './testHelpers';

import { url } from '../utils/spotify';
import { authenticate } from '../actions/auth';
import { loadTracks, likeTrack, trackLiked } from '../actions/track';
import { formatTrack } from '../epics/helpers';
import track from './track';

const initialState = { auth: { authToken: 'token' } };
const genres = [
  'acoustic',
  'alt-rock',
  'alternative',
  'ambient',
  'anime',
  'black-metal',
  'bluegrass',
  'blues',
];

const responseTracks = [
  {
    id: '1OJxI8lIWRqBvouJxW1nzN',
    name: 'Subwoofer Lullaby',
    popularity: 50,
    album: {
      name: 'An Album',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/81aa003fb60a031abe1f72253cf663cff201ad48',
          width: 640,
        },
      ],
    },
    preview_url: 'https://p.scdn.co/mp3-preview/872f1c73287e399cad17e225d8a8bf80581106af?cid=89b92773702c4e36a8014a880e7a9b7d',
    artists: [{
      id: '4uFZsG1vXrPcvnZ4iSQyrx',
      name: 'C418',
    }],
  },
  {
    id: '0g8C2klxNYbNZS5VlobCxL',
    name: 'Any Which Way - Martin Buttrich Red Mix',
    popularity: 4,
    album: {
      name: 'Any Which Way EP',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/1e732874b19b8853dccd29a0e68959af87c8c1d5',
          width: 640,
        },
      ],
    },
    preview_url: 'https://p.scdn.co/mp3-preview/21d8989600ba902d0f0800bda40b4d8d3be717b0?cid=89b92773702c4e36a8014a880e7a9b7d',
    artists: [{
      id: '0GJpYdmVCgg90TkyB1nB1y',
      name: 'Stacey Pullen',
    }],
  }
];

describe('trackEpic', () => {
  let store;
  beforeEach(() => {
    const epicMiddleware = createEpicMiddleware(track);
    const mockStore = configureMockStore([epicMiddleware]);
    store = mockStore(initialState);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('recommend Tracks', () => {

    it('should query the Spotify API and dispatch LOAD_TRACKS', () => {
      const loadUserAction = authenticate('token');
      const scopes = [
        nock(url())
          .get('/recommendations/available-genre-seeds')
          .reply(200, { genres: genres }),
        nock(url())
          .get(/recommendations/)
          .reply(200, { tracks: responseTracks }),
      ];

      store.dispatch(loadUserAction);

      return timeout(() => {
        expect(store.getActions()).toEqual([
          loadUserAction,
          loadTracks(responseTracks.map(formatTrack)),
        ]);
        expect(scopes.map(s => s.isDone())).toEqual([true, true]);
      })
    });
  });

  describe('like Track', () => {

    it('should put to the Spotify API and dispatch TRACK_LIKED', () => {
      const track = formatTrack(responseTracks[0]);
      const likeTrackAction = likeTrack(track);

      const scope = nock(url())
        .put('/me/tracks', { ids: [track.id] })
        .reply(200, {})

      store.dispatch(likeTrackAction);

      return timeout(() => {
        expect(store.getActions()).toEqual([
          likeTrackAction,
          trackLiked(track),
        ]);

        expect(scope.isDone()).toBe(true);
      })
    });
  });
});