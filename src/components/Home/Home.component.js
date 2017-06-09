// @flow
import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';

import { FlexContainer, FlexItem } from '../Flex';
import Preview from '../Preview';
import Button from '../Button';

type Props = {
  user?: User,
  tracks: Track[],
  searchTracks: (query: string) => any,
};

type State = {
  search: string,
};

class Home extends Component {

  state: State = { search: '' };
  props: Props;

  handleChange = ({ target: { value } }: SyntheticInputEvent) =>
    this.setState(state => ({ search: value }))

  handleSubmit = (e: SyntheticInputEvent) => {
    e.preventDefault();
    const { searchTracks } = this.props;
    const { search } = this.state;
    searchTracks(search);
  }

  render() {
    const { search } = this.state;
    const { user = {}, tracks } = this.props;

    return (
      <FlexContainer justifyContent="center">
        <FlexItem flex="0 0 400px">
          Hello {user.name}

          <Form inline onSubmit={this.handleSubmit}>
            <FormGroup controlId="searchForm">
              <ControlLabel>Search Tracks</ControlLabel>
              <FormControl
                type="text"
                value={search}
                placeholder="Enter your query ..."
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button success type="submit">
              Search
            </Button>
          </Form>

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