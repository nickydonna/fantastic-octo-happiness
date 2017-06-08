// @flow
import React, { Component } from 'react';

import { authUrl } from './utils/auth';

import Button from './components/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button href={authUrl} primary>
          Login With Spotify
        </Button>
      </div>
    );
  }
}

export default App;
