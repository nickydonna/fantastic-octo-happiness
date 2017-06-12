// @flow
import React, { Component } from 'react';

import { FlexContainer, FlexItem } from '../Flex';
import SwipeableCards from '../SwipeableCards';

type Props = {
  user?: User,
  tracks: Track[],
  like: (track: Track) => any,
  userLoading: boolean,
  tracksLoading: boolean
};

class Home extends Component {

  props: Props;

  handleChange = ({ target: { value } }: SyntheticInputEvent) =>
    this.setState(state => ({ search: value }));

  handleLike = (track: Track) =>
    this.props.like(track);

  render() {
    const { user = {}, tracks, userLoading, tracksLoading } = this.props;
    const loading = userLoading || tracksLoading;

    return (
      <FlexContainer justifyContent="center">
        <FlexItem flex="0 1 240">
          {loading
            ? <h2>Loading ...</h2>
            : (
              <div>
                Hello {user.name}
                {tracks.length !== 0 &&
                  <SwipeableCards tracks={tracks} onSwipedRight={this.handleLike} />
                }
              </div>
            )
          }
        </FlexItem>
      </FlexContainer>
    )
  }
}

export default Home;