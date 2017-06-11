// @flow
/**
 * We omit the props that styled components uses because they are passed to the underlying element
 * generating a React validation error.
 */
import { omit } from 'lodash';
import React from 'react';
import styled from 'styled-components';

type FlexItemProps = {
  flex?: string | number,
};

type FlexContainerProps = {
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse',
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
};

const itemProps = ['flex'];
const applyFlexItem = (Component: ReactClass<any>) => styled(
  props => <Component {...omit(props, itemProps)} />
) `
  flex: ${({ flex }: FlexItemProps) => flex || 0};
`;

const FlexItem = applyFlexItem(props => <div {...props} />);

const containerProps = ['alignItems', 'justifyContent', 'wrap', 'direction'];
const applyFlexContainer = (Component: ReactClass<any>) => styled(
  props => <Component {...omit(props, containerProps)} />
) `
  display: flex;
  align-items: ${({ alignItems = 'stretch' }: FlexContainerProps) => alignItems};
  flex-wrap: ${({ wrap = 'nowrap' }: FlexContainerProps) => wrap};
  justify-content: ${({ justifyContent = 'flex-start' }: FlexContainerProps) => justifyContent};
  flex-direction: ${({ direction = 'row' }: FlexContainerProps) => direction};
`;

const FlexContainer = applyFlexContainer(props => <div {...props} />);

export {
  applyFlexContainer,
  FlexContainer,
  applyFlexItem,
  FlexItem,
};
