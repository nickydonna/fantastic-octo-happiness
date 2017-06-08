// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    );
  }
}

export default App;
