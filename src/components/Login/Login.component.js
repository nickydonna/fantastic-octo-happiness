// @flow
import React, { Component } from 'react';

import { authUrl } from '../../utils/auth';

import Button from '../Button';
import { FlexContainer, FlexItem } from '../Flex';

class Login extends Component {
  render() {
    return (
      <FlexContainer justifyContent="center">
        <FlexItem>
          <Button href={authUrl} primary>
            Login With Spotify
        </Button>
        </FlexItem>
      </FlexContainer>
    )
  }
}

export default Login;