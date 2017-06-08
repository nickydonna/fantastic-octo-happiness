import configureMockStore from 'redux-mock-store';
import { push } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';

import { locationChange } from './testHelpers';

import { authenticate } from '../actions/auth';
import auth from './auth';
import * as routes from '../utils/routes';

const epicMiddleware = createEpicMiddleware(auth);
const mockStore = configureMockStore([epicMiddleware]);

describe('authEpic', () => {

  afterEach(() => epicMiddleware.replaceEpic(auth));

  describe('without accessToken', () => {
    let store;
    const initialState = { auth: {} };
    beforeEach(() => { store = mockStore(initialState); });

    it('redirects to login if no authToken', () => {
      const locationChangeToHome = locationChange('/')
      store.dispatch(locationChangeToHome);

      expect(store.getActions()).toEqual([
        locationChangeToHome,
        push(routes.LOGIN),
      ]);
    });
    
    it('should dispatch authenticate action', () => {
      const locationChangeToHome = locationChange('/login', { hash: '#access_token=token'})
      store.dispatch(locationChangeToHome);

      expect(store.getActions()).toEqual([
        locationChangeToHome,
        authenticate('token'),
      ]);
    });
  });

  describe('with accessToken', () => {
    let store;
    const initialState = {
      auth: {
        authToken: 'a token',
      },
    }
    beforeEach(() => { store = mockStore(initialState); });

    it('redirects to home if there is an authToken', () => {
      const locationChangeToLogin = locationChange('/login')
      store.dispatch(locationChangeToLogin);

      expect(store.getActions()).toEqual([
        locationChangeToLogin,
        push(routes.HOME),
      ]);
    });
  });
});