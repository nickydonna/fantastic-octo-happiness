// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Jumbotron } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import { authUrl } from '../../utils/spotify';

import Button from '../Button';

const PaddedJumbotron = styled(Jumbotron) `
  color: white;
  padding: 10px;
  background-color: #000000;

  @media (min-width: 351px) {
    padding: 25px;
  }
`;
const TinderfyImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 64px;
  height: auto;
`;
const SpotifyImg = styled.img`
  width: 25px;
  height: auto;
  float: right;
  margin-left: 15px;
`;

class Login extends Component {
  render() {
    return (
      <PaddedJumbotron >
        <Helmet>
          <title>Login - Tinderfy</title>
        </Helmet>
        <TinderfyImg src="/tinderfy.png" alt="Tinderfy" />
        <h2>Welcome to Tinderfy!</h2>
        <p>
          This application will recommend Spotify songs, and you can add them to your library by swiping right or ignore them by swiping left.
        </p>
        <p>
          To continue you must give us access to your Spotify data.
        </p>
        <p>
          <Button block href={authUrl} spotify lg>
            Continue With Spotify
            <SpotifyImg src="/spotify.png" alt="spotify"/>
          </Button>
        </p>
      </PaddedJumbotron>
    )
  }
}

export default Login;