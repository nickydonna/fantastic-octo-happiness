// @flow
import React, { PureComponent } from 'react';
import Swipe from 'react-swipe-component';
import { Motion, spring, presets } from 'react-motion';

import Card, { BackgroundCard } from './Card';

const { gentle } = presets;

const emptyTrack: Track = {
  id: 'empty',
  name: 'No Track',
  artists: [{ id: 'no artist', name: 'No Artist' }],
  album: 'No Album',
  image: '/no_cover.png',
  liked: false,
  popularity: 0,
};

type Props = {
  tracks: Track[],
  onSwipedLeft: (track: Track) => any,
  onSwipedRight: (track: Track) => any,
};

type State = {
  tracks: Track[],
  processedTracks: Track[],
  animation: 'none' | 'swipeLeft' | 'swipeRight',
};

const defaultCurrentStyle = { rotate: 0, translate: 0, opacity: 1 };
const leftSwipeStyle = { rotate: spring(-13, gentle), translate: spring(-100, gentle), opacity: spring(0, gentle) }
const rightSwipeStyle = { rotate: spring(13, gentle), translate: spring(100, gentle), opacity: spring(0, gentle) }

const defaultNextStyle = { scale: 0.75, opacity: 0 };
const scaleStyle = { scale: spring(1, gentle), opacity: 1 };

class SwipeableCard extends PureComponent {

  constructor(props: Props) {
    super(props);
    const { tracks } = props;
    this.state = {
      tracks,
      processedTracks: [],
      animation: 'none',
    }
  }

  static defaultProps: any;
  state: State;
  props: Props;

  swipeMotionStyle = () => {
    const { animation } = this.state;
    if (animation === 'swipeLeft') return leftSwipeStyle;
    if (animation === 'swipeRight') return rightSwipeStyle;
    return defaultCurrentStyle;
  }

  enterMotionStyle = () => {
    const { animation } = this.state;
    if (animation === 'none') return defaultNextStyle;
    return scaleStyle;
  }

  handleSwipeRight = (track: Track) => () => {
    this.setState(state => ({ animation: 'swipeRight' }));
    this.props.onSwipedRight(track);
  }

  handleSwipeLeft = (track: Track) => () => {
    this.setState(state => ({ animation: 'swipeLeft' }));
    this.props.onSwipedLeft(track);
  }

  handleOnRest = () => {
    this.setState(
      state => ({ animation: 'none' }),
      () => {
        this.setState(state => {
          const { tracks, processedTracks } = this.state;
          const [track, ...others] = tracks;
          const newProcessed = processedTracks.concat([track]);
          return { processedTracks: newProcessed, tracks: others };
        })
      });
  }

  render() {
    const { tracks } = this.state;
    const [track = emptyTrack, nextTrack = emptyTrack] = tracks;

    return (
      <div>
        <Motion
          defaultStyle={defaultCurrentStyle}
          style={this.swipeMotionStyle()}
        >
          {({ rotate, translate, opacity }) =>
            <Swipe
              key={track.id}
              nodeName="div"
              mouseSwipe
              onSwipedLeft={this.handleSwipeLeft(track)}
              onSwipedRight={this.handleSwipeRight(track)}
              style={{
                opacity,
                transform: `rotate(${rotate}deg) translate3d(${translate}%, 0, 0)`,
              }}
            >
              <Card track={track} />
            </Swipe>
          }
        </Motion>
        {nextTrack &&
          <Motion
            defaultStyle={defaultNextStyle}
            style={this.enterMotionStyle()}
            onRest={this.handleOnRest}
          >
            {({ scale, opacity }) =>
              <BackgroundCard
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                }}
                track={nextTrack}
              />
            }
          </Motion>
        }
      </div>
    );
  }
}

SwipeableCard.defaultProps = {
  onSwipedLeft: () => { },
  onSwipedRight: () => { },
}

export default SwipeableCard;
