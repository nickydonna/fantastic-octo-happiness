import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import addSwipeableCardStories from './SwipeableCard';
import addFloatingBadgeStories from './FloatingBadge';
import addCardStories from './Card';

import Button from '../components/Button';

storiesOf('Button', module)
  .add('default', () => <Button onClick={action('clicked')}>default</Button>)
  .add('primary', () => <Button primary onClick={action('clicked')}>primary</Button>)
  .add('success', () => <Button success onClick={action('clicked')}>success</Button>)
  .add('info', () => <Button info onClick={action('clicked')}>info</Button>)
  .add('warning', () => <Button warning onClick={action('clicked')}>warning</Button>)
  .add('danger', () => <Button danger onClick={action('clicked')}>danger</Button>)
  .add('link', () => <Button link onClick={action('clicked')}>link</Button>)
  .add('spotify', () => <Button spotify onClick={action('clicked')}>Spotify</Button>);

addFloatingBadgeStories();
addCardStories();
addSwipeableCardStories();