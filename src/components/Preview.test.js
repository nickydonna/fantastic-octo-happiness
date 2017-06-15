import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Preview from './Preview';

import tracks from '../fixtures/tracks';

const [track] = tracks;
const localFileTrack = { ...track, previewUrl: '../fixtures/moose.mp3' };
const noPreviewTrack = { ...track, previewUrl: undefined };

it('renders a preview button with previewUrl', () => {
  const tree = renderer.create(
    <Preview track={localFileTrack} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a preview button with NO previewUrl', () => {
  const tree = renderer.create(
    <Preview track={noPreviewTrack} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a preview button and clicks it once', () => {
  const wrapper = mount(
    <Preview track={localFileTrack} />
  )

  const button = wrapper.find('button');
  wrapper.find('button').simulate('click');

  expect(button.hasClass('btn-danger')).toBe(true);
  expect(button.text()).toBe('Stop');
});

it('renders a preview button and clicks it twice', () => {
  const wrapper = mount(
    <Preview track={localFileTrack} />
  )

  const button = wrapper.find('button');
  wrapper.find('button').simulate('click');
  wrapper.find('button').simulate('click');

  expect(button.hasClass('btn-primary')).toBe(true);
  expect(button.text()).toBe('Preview');
});

it('renders a preview button with out preview', () => {
  const wrapper = mount(
    <Preview track={noPreviewTrack} />
  )

  const button = wrapper.find('button');
  wrapper.find('button').simulate('click');

  expect(button.hasClass('btn-primary')).toBe(true);
  expect(button.text()).toBe('No Preview Available');
});

