// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';

import Login from '../Login';
import Home from '../Home';
import Button from '../Button';
import { applyFlexContainer } from '../Flex';

const FullHeight = styled.div`
  height: 100%;

  @media (max-height: 550px) {
    .FullHeightContainer {
      padding-top: 100px;
    }
  }
`;
const FullHeightContainer = applyFlexContainer(FullHeight);
const AdaptableFlexItem = styled.div`
  flex: 1;

  @media (min-width: 351px) {
    flex: 0 1 350px;
  }
`
const FloatingButton = styled(Button)`
  float: right;
  top: 15px;
  right: 10px
  color: white;
  position: absolute;
`;
const TinderfyLogo = styled.img`
  float: left;
  width: 25px;
  height: auto;
  top: 10px;
  left: 10px;
  position: absolute
`

type Props = {
  isLogged: boolean,
};

class App extends Component {

  props: Props;

  logout = () => window.location.reload();

  render() {
    const { isLogged } = this.props;
    return (
      <FullHeight>
        {isLogged &&
          <div className="Navbar">
            <TinderfyLogo src="/tinderfy.png" alt="Tinderfy" />
            <FloatingButton link onClick={this.logout}>
              Logout
            </FloatingButton>
          </div>
        }
        <FullHeightContainer className="FullHeightContainer" alignItems="center" justifyContent="center">
          <AdaptableFlexItem>
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Home} />
            </Switch>
          </AdaptableFlexItem>
        </FullHeightContainer>
      </FullHeight>
    );
  }
}

export default App;
