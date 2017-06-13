// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';
import FloatingBadge from '../components/FloatingBadge';

class FloatingBadgeParent extends React.Component {
  state = { show: true };

  timeoutId: ?number;

  startTimeout() {
    this.clearTimeout();
    this.timeoutId = setTimeout(() => this.setState(state => ({ show: false })), 2000);
  }

  clearTimeout() {
    if (!this.timeoutId) return;
    clearTimeout(this.timeoutId);
  }

  showBadge = () => {
    this.setState(
      state => ({ show: true }), // show
      () => this.startTimeout()  // after rendering, trigger timeout
    )
  }

  componentDidMount() {
    this.startTimeout();
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  render() {
    const { show } = this.state;

    return (
      <div>
        {!show && <Button primary onClick={this.showBadge}>Show</Button>}
        <FloatingBadge show={show} />
      </div>
    );
  }
}

const addStories = () => {
  storiesOf('FloatingBadge', module)
    .add('default', () => <FloatingBadge />)
    .add('autoHide (2000 ms)', () => <FloatingBadgeParent />);
};

export default addStories;