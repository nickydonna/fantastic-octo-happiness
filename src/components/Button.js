// @flow
import { omit } from 'lodash';
import React, { PureComponent } from 'react';
import { Button as BSButton } from 'react-bootstrap';
import styled from 'styled-components';

import { green } from '../utils/spotify';

const omittedProps = ['primary', 'success', 'info', 'warning', 'danger', 'link', 'sm', 'lg', 'xs'];

type Props = {
  primary?: boolean,
  success?: boolean,
  info?: boolean,
  warning?: boolean,
  danger?: boolean,
  link?: boolean,
  spotify?: boolean,
  lg?: boolean,
  sm?: boolean,
  xs?: boolean,
  glyph?: boolean,
  [x: string]: any,
};

const StyledButton = styled(props => <BSButton {...omit(props, ['spotify', 'glyph']) } />) `
  background-color: ${({ spotify }: Props) => spotify ? green : ''};
  color: ${({ spotify }: Props) => spotify ? '#000' : ''};
  font-family: 'Montserrat', sans-serif;


  &.btn-primary {
    border: none;
    background-color: #000;
    &:hover {
      border: none;
    }
  }

  &.btn-danger {
    background-color: #DB4C2C;
    border: none;
    &:hover {
      border: none;
    }
  }

  ${({ glyph }: Props) => glyph ? (`
    .glyphicon {
      float: right;
      margin-top: 1px;
    }
  `) : (
    ''
  )}
`;

const bsStyle = ({ primary, success, info, warning, danger, link }: Props) => {
  if (primary) return 'primary';
  if (success) return 'success';
  if (info) return 'info';
  if (warning) return 'warning';
  if (danger) return 'danger';
  if (link) return 'link';
  return null;
}

const bsSize = ({ lg, sm, xs }: Props) => {
  if (lg) return 'large';
  if (sm) return 'small';
  if (xs) return 'xsmall';
  return null;
}

class Button extends PureComponent {
  props: Props;

  render() {
    const props = this.props;
    const others = omit(this.props, omittedProps);
    return <StyledButton bsStyle={bsStyle(props)} bsSize={bsSize(props)} {...others} />;
  }
}

export default Button;
