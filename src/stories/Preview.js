// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import Preview from '../components/Preview';

import tracks from '../fixtures/tracks';

const [track] = tracks;
const noPreviewTrack = { ...track, previewUrl: undefined };

const addStories = () => {
  storiesOf('Preview', module)
    .add('with previewUrl', () => <Preview track={track}/>)
    .add('without previewUrl', () => <Preview track={noPreviewTrack} />);
};

export default addStories;