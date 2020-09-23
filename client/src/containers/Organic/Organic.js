import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../Login/Login';
import Shop from '../Shop/Shop';
import UserContext from '../../context/user-context';
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
        <UserContext.Provider value={{user: this.state.user}}>
          {this.state.logged ? <Shop /> : <Login setUser={(u) => this.setUser(u)} />}
        </UserContext.Provider>
      </div>
    );
  }
}
{/* <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Shop} /> */}
//<Route path="/" exact component={Login} />
export default Organic;
