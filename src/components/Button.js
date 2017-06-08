// @flow
import { omit } from 'lodash';
import React, { PureComponent } from 'react';
import { Button as BSButton } from 'react-bootstrap';

const omittedProps = ['primary', 'success', 'info', 'warning', 'danger', 'link'];

type Props = {
  primary?: boolean,
  success?: boolean,
  info?: boolean,
  warning?: boolean,
  danger?: boolean,
  link?: boolean,
  [x: string]: any,
};

const bsStyle = ({ primary, success, info, warning, danger, link }: Props) => {
  if (primary) return 'primary';
  if (success) return 'success';
  if (info) return 'info';
  if (warning) return 'warning';
  if (danger) return 'danger';
  if (link) return 'link';
  return null;
}

class Button extends PureComponent {
  props: Props;

  render() {
    const props = this.props;
    const others = omit(this.props, omittedProps);
    return <BSButton bsStyle={bsStyle(props)} {...others} />;
  }
}

export default Button;
