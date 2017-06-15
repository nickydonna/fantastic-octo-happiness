// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SwipeableCards from '../components/SwipeableCards';

import tracks from '../fixtures/tracks';

const addStories = () => {
  storiesOf('SwipeableCard', module)
    .add('basic', () => (
      <div style={{ marginLeft: 25 }}>
        <SwipeableCards
          tracks={tracks}
          onSwipedLeft={action('swippedLeft')}
          onSwipedRight={action('swippedRight')}
          onLoadMore={action('loadMore')}
          onLike={action('Liked')}
        />
      </div>
    ));
};

export default addStories;