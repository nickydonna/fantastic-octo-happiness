// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { likeTrack } from '../../actions/track';
import { getUser } from '../../reducers/user';
import { getTracks } from '../../reducers/track';

import Home from './Home.component';

const mapStateToProps = (state: State) => ({
  user: getUser(state),
  tracks: getTracks(state),
});

const mapDispatchToState = (dispatch: Dispatch<GenericAction>) => ({
  like: (track: Track) => dispatch(likeTrack(track)),
});

const container = connect(mapStateToProps, mapDispatchToState);
export default container(Home);
