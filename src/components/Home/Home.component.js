// @flow
import React, { Component } from 'react';

import { FlexContainer, FlexItem } from '../Flex';
import SwipeableCards from '../SwipeableCards';
import FloatingBadge from '../FloatingBadge';

type Props = {
  user?: User,
  tracks: Track[],
  like: (track: Track) => any,
  userLoading: boolean,
  tracksLoading: boolean,
  recommendTracks: () => any,
};

type State = {
  showBadge: boolean,
};

class Home extends Component {
  state: State = { showBadge: false };
  props: Props;

  startTimeout = () => {
    setTimeout(() =>
      this.setState(state => ({ showBadge: false })),
      750,
    );
  }

  handleLike = (track: Track) => {
    this.props.like(track);
    this.setState(
      state => ({ showBadge: true }),
      () => this.startTimeout()
    );
  }

  render() {
    const { user = {}, tracks, userLoading, tracksLoading, recommendTracks } = this.props;
    const { showBadge } = this.state;
    const loading = userLoading || tracksLoading;

    return (
      <FlexContainer justifyContent="center">
        <FlexItem flex="0 1 240">
          {loading
            ? <h2>Loading ...</h2>
            : (
              <div>
                Hello {user.name}
                <SwipeableCards
                  tracks={tracks}
                  onSwipedRight={this.handleLike}
                  onLoadMore={recommendTracks}
                />
                <FloatingBadge show={showBadge} />
              </div>
            )
          }
        </FlexItem>
      </FlexContainer>
    )
  }
}

export default Home;