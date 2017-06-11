// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { searchTracks } from '../../actions/track';
import { getUser } from '../../reducers/user';

import App from './App.component';

const mapStateToProps = (state: State) => ({
  user: getUser(state),
});

const mapStateToDispatch = (dispatch: Dispatch<GenericAction>) => ({
  searchTracks: (query: string) => dispatch(searchTracks(query)),
});

const container = connect(mapStateToProps, mapStateToDispatch);
export default container(App);
