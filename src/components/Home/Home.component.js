// @flow
import React, { Component } from 'react';

import { FlexContainer, FlexItem } from '../Flex';
import SwipeableCards from '../SwipeableCards';

type Props = {
  user?: User,
  tracks: Track[],
  like: (track: Track) => any,
};

class Home extends Component {

  props: Props;

  handleChange = ({ target: { value } }: SyntheticInputEvent) =>
    this.setState(state => ({ search: value }));

  handleLike = (track: Track) =>
    this.props.like(track);

  render() {
    const { user = {}, tracks } = this.props;

    return (
      <FlexContainer justifyContent="center">
        <FlexItem flex="0 0 400px">
          Hello {user.name}
          { tracks.length !== 0 && 
            <SwipeableCards tracks={tracks} onSwipedRight={this.handleLike} />
          }
        </FlexItem>
      </FlexContainer>
    )
  }
}

export default Home;