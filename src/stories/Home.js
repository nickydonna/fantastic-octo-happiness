// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Home from '../components/Home/Home.component';

import tracks from '../fixtures/tracks';

const Wrapper = ({ children }) =>
  <div style={{ height: '100%', backgroundColor: '#000' }}>
    {children}
  </div>

const addStories = () => {
  storiesOf('Home', module)
    .add('loading', () =>
      <Wrapper>
        <Home
          userLoading={true}
          tracksLoading={true}
          recommendTracks={action('recommendTracks')}
          tracks={tracks}
          like={action('like')}
        />
      </Wrapper>)
    .add('with tracks', () =>
      <Wrapper>
        <Home
          userLoading={false}
          tracksLoading={false}
          recommendTracks={action('recommendTracks')}
          tracks={tracks}
          like={action('like')}
        />
      </Wrapper>
    )
    .add('without tracks', () =>
      <Wrapper>
        <Home
          userLoading={false}
          tracksLoading={false}
          recommendTracks={action('recommendTracks')}
          tracks={[]}
          like={action('like')}
        />
      </Wrapper>
    )
};

export default addStories;