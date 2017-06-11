import React from 'react';
import Home from './Home.component';
import renderer from 'react-test-renderer';

it('renders the Home page', () => {
  const tree = renderer.create(
    <Home tracks={[]}/>
  ).toJSON()
  expect(tree).toMatchSnapshot();
});

