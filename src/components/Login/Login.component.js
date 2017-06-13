// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Jumbotron } from 'react-bootstrap';

import { authUrl } from '../../utils/spotify';

import Button from '../Button';

const PaddedJumbotron = styled(Jumbotron) `
  padding-left: 25px;
  padding-right: 25px;
  margin-left: 25px
  margin-right: 25px
`;

class Login extends Component {
  render() {
    return (
      <PaddedJumbotron>
        <h1>Welcome to Tinderfy!</h1>
        <p>
          This application will recommend Spotify songs, and you can add them to your library by swiping write or ignore them by swiping left.
        </p>
        <p>
          To continue you must give us access to your Spotify data.
        </p>
        <p>
          <Button href={authUrl} spotify lg>
            Continue With Spotify
          </Button>
        </p>
      </PaddedJumbotron>
    )
  }
}

export default Login;