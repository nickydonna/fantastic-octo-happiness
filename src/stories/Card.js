// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Card from '../components/Card';
import tracks from '../fixtures/tracks';

const [track] = tracks;

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