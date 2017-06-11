import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';

import App from './App.container';

const mockStore = configureMockStore();
const initialStore = {
  auth: {},
  user: {},
  track: {
    tracks: [],
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StaticRouter context={{}} >
      <Provider store={mockStore(initialStore)}>
        <App />
      </Provider>
    </StaticRouter>,
    div);
});
