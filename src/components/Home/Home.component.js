// @flow
import React, { Component } from 'react';

import { FlexContainer, FlexItem } from '../Flex';

class Home extends Component {
  render() {
    return (
      <FlexContainer justifyContent="center">
        <FlexItem>
          Hello
        </FlexItem>
      </FlexContainer>
    )
  }
}

export default Home;