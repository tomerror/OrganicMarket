import React, { Component } from 'react';
import Login from '../Login/Login';
import Shop from '../Shop/Shop';

class Organic extends Component {
  state = {
    logged: false,
    user: {}
  }

  setUser = (u) => {
    this.setState({ user: u, logged: true })
  }

  render() {
    return (
      <div>
        {this.state.logged ? <Shop user={this.state.user} /> : <Login setUser={(u) => this.setUser(u)} />}
      </div>
    );
  }
}

export default Organic;
