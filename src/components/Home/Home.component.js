// @flow
import React, { Component } from 'react';

import { FlexContainer, FlexItem } from '../Flex';
import Preview from '../Preview';

type Props = {
  user?: User,
  tracks: Track[],
  searchTracks: (query: string) => any,
};

class Home extends Component {

  props: Props;

  handleChange = ({ target: { value } }: SyntheticInputEvent) =>
    this.setState(state => ({ search: value }))


  render() {
    const { user = {}, tracks } = this.props;

    return (
      <FlexContainer justifyContent="center">
        <FlexItem flex="0 0 400px">
          Hello {user.name}

          <ul>
            {tracks.map(track =>
              <li key={track.id}>
                {track.name}
                {' - '}
                <small>
                  {track.artists.map(a => a.name).join(', ')}
                </small>
                <Preview track={track} />
              </li>
            )}
          </ul>
        </FlexItem>
      </FlexContainer>
    )
  }
}

export default Home;