import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import nock from 'nock';

import { timeout } from './testHelpers';

import { url } from '../utils/spotify';
import { loadUser } from '../actions/user';
import { formatUser } from '../epics/helpers';
import user from './user';

const initialState = { auth: { authToken: 'token' }, user: {} };
const responseUser = { id: 'id', display_name: 'name', images: [], email: 'email@domain.com' };

describe('trackEpic', () => {
  let store;
  beforeEach(() => {
    const epicMiddleware = createEpicMiddleware(user);
    const mockStore = configureMockStore([epicMiddleware]);
    store = mockStore(initialState);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('load User', () => {

    it('should query the Spotify API and dispatch LOAD_USER', () => {
      const anyAction = { type: 'INIT' } // Dispatch any action
      const scope = nock(url())
        .get('/me')
        .reply(200, responseUser);

      // Dispatch two action
      // The LOAD_USER should happen only once
      store.dispatch(anyAction);
      store.dispatch(anyAction);

      return timeout(() => {
        expect(store.getActions()).toEqual([
          anyAction,
          anyAction,
          loadUser(formatUser(responseUser)),
        ]);
        expect(scope.isDone()).toEqual(true);
      });
    });
  });
});