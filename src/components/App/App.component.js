// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Login from '../Login';
import Home from '../Home';

class App extends Component {

  logout = () => window.location.reload();

  render() {
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Tinderfy</span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={this.logout}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
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
