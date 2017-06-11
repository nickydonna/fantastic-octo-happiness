// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Login from '../Login';
import Home from '../Home';

type Props = {
  user?: User,
};

class App extends Component {

  props: Props;

  logout = () => window.location.reload();

  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Tinderfy</span>
            </Navbar.Brand>
            {user && <Navbar.Toggle />}
          </Navbar.Header>
          {user &&
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem onClick={this.logout}>Logout</NavItem>
              </Nav>
            </Navbar.Collapse>
          }
        </Navbar>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
