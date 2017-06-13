// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';
import FloatingBadge from '../components/FloatingBadge';

class FloatingBadgeParent extends React.Component {
  state = { show: true };

  startTimeout() {
    setTimeout(() => this.setState(state => ({ show: false })), 2000);
  }

  componentDidMount() {
    this.startTimeout();
  }

  showBadge = () => {
    this.setState(
      state => ({ show: true }), // show
      () => this.startTimeout()  // after rendering, trigger timeout
    )
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