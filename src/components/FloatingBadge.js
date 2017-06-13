// @flow
import React, { PureComponent } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import styled from 'styled-components';

const { gentle } = presets;

type Props = {
  show: boolean,
};

const Badge = styled.div`
  position: absolute;
  backgroundColor: #5CB85C;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  left: 50%;
  margin-left: -35px;
  top: 150px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &>p {
    margin: 0;
  }

`;

class FloatingBadge extends PureComponent {
  static defaultProps: any;
  props: Props;

  willEnter = () => ({ opacity: 0 });
  willLeave = () => ({ opacity: spring(0, gentle) });

  render() {
    const { show } = this.props;

    const styles = show ? [{ key: 'badge', style: { opacity: spring(1, gentle) } }] : [];
    const defaultStyles = show ? [{ key: 'badge', style: { opacity: 0 } }] : [];

    return (
      <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
        styles={styles}
        defaultStyles={defaultStyles}
      >
        {styles =>
          <div>
            {styles.map(({ key, style }) =>
              <Badge key={key} style={style}>
                <p>Added</p>
              </Badge>
            )}
          </div>
        }
      </TransitionMotion >
    );
  }
};

FloatingBadge.defaultProps = {
  show: true,
};

export default FloatingBadge;
