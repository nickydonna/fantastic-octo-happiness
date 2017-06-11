// @flow
import { connect } from 'react-redux';

import { getUser } from '../../reducers/user';
import { getTracks } from '../../reducers/track';

import Home from './Home.component';

const mapStateToProps = (state: State) => ({
  user: getUser(state),
  tracks: getTracks(state),
});

const container = connect(mapStateToProps);
export default container(Home);
