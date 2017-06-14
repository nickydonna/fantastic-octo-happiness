// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

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

const Loading = styled.div`
  color: white;
  font-family: 'Montserrat', sans-serif;
  text-align: center;

  img.logo {
    width: 64px;
    height: auto;
    display:block;
    margin: 0 auto;
  }

  img.loading {
    height: 20px;
    margin-left: 8px;
  }
`;

class Home extends Component {
  state: State = { showBadge: false };
  props: Props;

  timeoutId: ?number;

  startTimeout() {
    this.clearTimeout();
    this.timeoutId = setTimeout(() =>
      this.setState(state => ({ showBadge: false })),
      750,
    );
  }

  clearTimeout() {
    if (!this.timeoutId) return;
    clearTimeout(this.timeoutId);
  }

  handleLike = (track: Track) => {
    this.props.like(track);
    this.setState(
      state => ({ showBadge: true }),
      () => this.startTimeout()
    );
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  render() {
    const { tracks, userLoading, tracksLoading, recommendTracks } = this.props;
    const { showBadge } = this.state;
    const loading = userLoading || tracksLoading;

    return (
      <FlexContainer justifyContent="center">
        <FlexItem flex="0 1 240">
          {loading
            ? (
              <Loading>
                <Helmet>
                  <title>Loading - Tinderfy</title>
                </Helmet>
                <img className="logo" src="/tinderfy.png" alt="Tinderfy" />
                <h2>
                  Loading
                  <img className="loading" src="/audio.svg" alt="loading" />
                </h2>
              </Loading>
            ) : (
              <div>
                <Helmet>
                  <title>Tinderfy</title>
                </Helmet>
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