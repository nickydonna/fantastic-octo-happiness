// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Card from '../components/Card';

const track = {
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
  liked: true,
};

const Wrapper = (({ children }) =>
  <div style={{ backgroundColor: '#000', padding: 20}}>
    {children}
  </div>
)

const addStories = () => {
  storiesOf('Card', module)
    .add('with Track', () => <Wrapper><Card track={track} onLoadMore={action('loadMore')} /></Wrapper>)
    .add('without Track', () => <Wrapper><Card onLoadMore={action('loadMore')} /></Wrapper>);
};

export default addStories;