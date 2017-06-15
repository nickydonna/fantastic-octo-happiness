import React from 'react';
import SwipeableCards from './SwipeableCards';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';

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

