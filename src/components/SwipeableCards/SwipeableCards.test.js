import React from 'react';
import SwipeableCards from './SwipeableCards';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';

import tracks from '../../fixtures/tracks';
 
const createClientXY = (x, y) => ({ clientX: x, clientY: y });
const createTouchEventObject = (x = 0, y = 0) => ({ touches: [createClientXY(x, y)] });

it('renders a card', () => {
  const tree = renderer.create(
    <div >
      <SwipeableCards
        tracks={tracks}
      />
    </div>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should call function on swipe left with the mouse', () => {
  const onSwipedLeft = sinon.spy();
  const wrapper = mount(
    <SwipeableCards
      tracks={tracks}
      onSwipedLeft={onSwipedLeft}
    />
  );

  const Card = wrapper.find('.Card');

  Card.simulate('mouseDown', createClientXY(250, 50));
  Card.simulate('mouseMove', createClientXY(50, 50));
  Card.simulate('mouseUp', createClientXY(50, 50));
  
  expect(onSwipedLeft).toHaveProperty('callCount', 1);
});

it('should call function on swipe right with the mouse', () => {
  const onSwipedRight = sinon.spy();
  const wrapper = mount(
    <SwipeableCards
      tracks={tracks}
      onSwipedRight={onSwipedRight}
    />
  );

  const Card = wrapper.find('.Card');

  Card.simulate('mouseDown', createClientXY(50, 50));
  Card.simulate('mouseMove', createClientXY(250, 50));
  Card.simulate('mouseUp', createClientXY(250, 50));
  
  expect(onSwipedRight).toHaveProperty('callCount', 1);
});

it('should call function on swipe left with the touch', () => {
  const onSwipedLeft = sinon.spy();
  const wrapper = mount(
    <SwipeableCards
      tracks={tracks}
      onSwipedLeft={onSwipedLeft}
    />
  );

  const Card = wrapper.find('.Card');

  Card.simulate('touchStart', createTouchEventObject(250, 50));
  Card.simulate('touchMove', createTouchEventObject(50, 50));
  Card.simulate('touchEnd', createTouchEventObject(50, 50));
  
  expect(onSwipedLeft).toHaveProperty('callCount', 1);
});

it('should call function on swipe left with the touch', () => {
  const onSwipedRight = sinon.spy();
  const wrapper = mount(
    <SwipeableCards
      tracks={tracks}
      onSwipedRight={onSwipedRight}
    />
  );

  const Card = wrapper.find('.Card');

  Card.simulate('touchStart', createTouchEventObject(50, 50));
  Card.simulate('touchMove', createTouchEventObject(250, 50));
  Card.simulate('touchEnd', createTouchEventObject(250, 50));
  
  expect(onSwipedRight).toHaveProperty('callCount', 1);
});

