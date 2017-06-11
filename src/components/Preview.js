// @flow
import React, { PureComponent } from 'react';
import Sound from 'react-sound';

import Button from './Button';

type Props = {
  track: Track,
};

type State = {
  playing: boolean
};

const generateButtonText = (url?: string, playing: boolean) => {
  if (!url) return 'No Preview Available';
  return playing
    ? 'Stop'
    : 'Preview';
}


class Preview extends PureComponent {

  state: State = {
    playing: false,
  };
  props: Props;

  handlePlayingChanged = (playing: boolean) => () =>
    this.setState(state => ({ playing }));

  render() {
    const { playing } = this.state;
    const { track } = this.props;
    const { previewUrl } = track;

    const playStatus = playing
      ? Sound.status.PLAYING
      : Sound.status.STOPPED;

    return (
      <Button
        disabled={!previewUrl}
        primary={!playing}
        danger={playing}
        onClick={this.handlePlayingChanged(!playing)}
      >
        {previewUrl &&
          <Sound
            url={previewUrl}
            playStatus={playStatus}
            onFinishedPlaying={this.handlePlayingChanged(false)}
          />
        }
        {generateButtonText(previewUrl, playing)}
      </Button>
    );
  }
}

export default Preview;
