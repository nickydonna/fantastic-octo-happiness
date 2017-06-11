// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { ConnectedRouter, routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeMapTo';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import epic from './epics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHistory();
const routerMiddleware = createRouterMiddleware(history)
const epicMiddleware = createEpicMiddleware(epic);

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(
    epicMiddleware,
    routerMiddleware,
  ),
));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root'),
);
registerServiceWorker();
