import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StaticRouter context={{}} >
      <App />
    </StaticRouter>,
    div);
});
