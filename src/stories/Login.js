// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import Login from '../components/Login';

const addStories = () => {
  storiesOf('Login', module)
    .add('default', () => <Login  />)
};

export default addStories;