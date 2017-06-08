// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Login from './components/Login';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}

export default App;
