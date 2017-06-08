import React from 'react';
import Login from './Login.component';
import renderer from 'react-test-renderer';

it('renders the login page', () => {
  const tree = renderer.create(
    <Login />
  ).toJSON()
  expect(tree).toMatchSnapshot();
});

