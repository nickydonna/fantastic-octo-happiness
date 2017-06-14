// @flow
import { connect } from 'react-redux';

import { getAuthToken } from '../../reducers/auth';

import App from './App.component';

const mapStateToProps = (state: State) => ({
  isLogged: !!getAuthToken(state),
});

const container = connect(mapStateToProps);
export default container(App);
