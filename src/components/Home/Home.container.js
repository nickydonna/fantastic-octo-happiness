// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { likeTrack, recommendTracks } from '../../actions/track';
import { getTracks, getLoading as getTracksLoading } from '../../reducers/track';

import Home from './Home.component';

const mapStateToProps = (state: State) => ({
  tracks: getTracks(state),
  tracksLoading: getTracksLoading(state),
});

const mapDispatchToState = (dispatch: Dispatch<GenericAction>) => ({
  like: (track: Track) => dispatch(likeTrack(track)),
  recommendTracks: () => dispatch(recommendTracks()),
});

const container = connect(mapStateToProps, mapDispatchToState);
export default container(Home);
