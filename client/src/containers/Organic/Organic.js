import React, { Component } from 'react';
import Login from '../../components/Login/Login';
import Shop from '../../components/Shop/Shop';

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
