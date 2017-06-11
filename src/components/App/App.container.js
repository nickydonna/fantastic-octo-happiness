// @flow
import { connect } from 'react-redux';

import { getUser } from '../../reducers/user';

import App from './App.component';

const mapStateToProps = (state: State) => ({
  user: getUser(state),
});

const container = connect(mapStateToProps);
export default container(App);
