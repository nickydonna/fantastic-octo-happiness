// @flow
import React, { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap';

import { FlexContainer, FlexItem } from '../Flex';
import Preview from '../Preview';
import Button from '../Button';

type Props = {
  user?: User,
  tracks: Track[],
  like: (track: Track) => any,
};

class Home extends Component {

  props: Props;

  handleChange = ({ target: { value } }: SyntheticInputEvent) =>
    this.setState(state => ({ search: value }));

  handleLike = (track: Track) => () =>
    this.props.like(track);

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
                {' - '}
                {track.liked && 'Me gusta!!'}
                <div>
                  <ButtonGroup>
                    <Preview track={track} />
                    <Button success onClick={this.handleLike(track)}>Like</Button>
                  </ButtonGroup>
                </div>
              </li>
            )}
          </ul>
        </FlexItem>
      </FlexContainer>
    )
  }
}

export default Home;