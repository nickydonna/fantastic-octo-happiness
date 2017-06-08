import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';

it('renders a basic button', () => {
    const tree = renderer.create(
    <Button>Basic Button</Button>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a primary button', () => {
    const tree = renderer.create(
    <Button primary>Basic Button</Button>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a success button', () => {
    const tree = renderer.create(
    <Button success>Basic Button</Button>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a info button', () => {
    const tree = renderer.create(
    <Button info>Basic Button</Button>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a warning button', () => {
    const tree = renderer.create(
    <Button warning>Basic Button</Button>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a danger button', () => {
    const tree = renderer.create(
    <Button danger>Basic Button</Button>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a link button', () => {
    const tree = renderer.create(
    <Button link>Basic Button</Button>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
