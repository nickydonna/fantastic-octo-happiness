// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SwipeableCards from '../components/SwipeableCards';

const tracks = [
  {
    id: '1OJxI8lIWRqBvouJxW1nzN',
    name: 'Subwoofer Lullaby',
    popularity: 50,
    album: 'An Album',
    previewUrl: 'https://p.scdn.co/mp3-preview/872f1c73287e399cad17e225d8a8bf80581106af?cid=89b92773702c4e36a8014a880e7a9b7d',
    image: 'https://i.scdn.co/image/81aa003fb60a031abe1f72253cf663cff201ad48',
    artists: [{
      id: '4uFZsG1vXrPcvnZ4iSQyrx',
      name: 'C418',
    }],
  },
  {
    id: '0g8C2klxNYbNZS5VlobCxL',
    name: 'Any Which Way - Martin Buttrich Red Mix',
    popularity: 4,
    album: 'Any Which Way EP',
    previewUrl: 'https://p.scdn.co/mp3-preview/21d8989600ba902d0f0800bda40b4d8d3be717b0?cid=89b92773702c4e36a8014a880e7a9b7d',
    image: 'https://i.scdn.co/image/1e732874b19b8853dccd29a0e68959af87c8c1d5',
    artists: [{
      id: '0GJpYdmVCgg90TkyB1nB1y',
      name: 'Stacey Pullen',
    }],
  }
];

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