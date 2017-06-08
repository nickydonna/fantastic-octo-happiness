import 'jest-styled-components'
import React from 'react';
import { FlexContainer, FlexItem } from './Flex';
import renderer from 'react-test-renderer';

it('renders a basic flex container', () => {
  const tree = renderer.create(
    <FlexContainer>Flex Container</FlexContainer>
  ).toJSON()
  expect(tree).toMatchStyledComponentsSnapshot();
});

it('renders a flex container', () => {
  const tree = renderer.create(
    <FlexContainer
      alignItems="center"
      justifyContent="center"
      wrap="wrap-reverse"
      direction="column-reverse"
    >Flex Container</FlexContainer>
  ).toJSON();
  expect(tree).toMatchStyledComponentsSnapshot();
});

it('renders a basic flex item', () => {
  const tree = renderer.create(
    <FlexItem>Flex Item</FlexItem>
  ).toJSON();
  expect(tree).toMatchStyledComponentsSnapshot();
});
