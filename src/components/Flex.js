// @flow
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

const applyFlexItem = (Component: string | ReactClass<any>) => styled(Component) `
  flex: ${({ flex }: FlexItemProps) => flex || 0};
`;

const FlexItem = applyFlexItem('div');

const applyFlexContainer = (Component: string | ReactClass<any>) => styled(Component) `
  display: flex;
  align-items: ${({ alignItems = 'stretch' }: FlexContainerProps) => alignItems};
  flex-wrap: ${({ wrap = 'nowrap' }: FlexContainerProps) => wrap};
  justify-content: ${({ justifyContent = 'flex-start' }: FlexContainerProps) => justifyContent};
  flex-direction: ${({ direction = 'row' }: FlexContainerProps) => direction};
`;

const FlexContainer = applyFlexContainer('div');

export {
  applyFlexContainer,
  FlexContainer,
  applyFlexItem,
  FlexItem,
};
