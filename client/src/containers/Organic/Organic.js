import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { Cart } from 'organic-structures';

import Login from '../Login/Login';
import { Navbar, Groceries, Readme, Sidebar } from '../../components';
import { Checkout, Manage, Customer } from '../../containers';
import utils from '../../utils';


class Organic extends Component {
  state = {
    logged: false,
    search: '',
    tabs: []
  }

  getData = () => {
    this.props.getProducts(this.props.user.username, this.props.user.password);
    if (cookie.load(`cart:${this.props.user.username}`) != undefined) {
      this.props.loadCartFromCookies(this.props.user.username);
      //this.updateCartOnAdminChanges()
    }
    this.setState({ logged: true })
  }

  updateCartOnAdminChanges = () => {
    let cart = {
      amount: 0,
      count: 0,
      items: [],
      delivery: this.state.cart.delivery
    }

    this.state.cart.items.forEach(fromCart => {
      let fromDB = this.props.products.filter((p) => p.display == fromCart.display)[0]
      cart.items.push({
        "category": fromDB.category,
        "name": fromDB.name,
        "display": fromDB.display,
        "count": fromCart.count,
        "supply": fromDB.supply - fromCart.count,
        "details": {
          "img": fromDB.img,
          "price": parseFloat(fromDB.price),
          "weight": parseFloat(fromDB.weight),
          "discount": fromDB.discount
        }
      })
      cart.count += fromCart.count
      cart.amount += (fromDB.price - fromDB.price * 0.1 * fromDB.discount) * fromDB.weight * fromCart.count
    })
    this.setState({ cart: cart })
  };

  searchProduct = (event) => {
    this.setState({ search: event.target.value })
  }

  logout = () => {
    cookie.remove('username', { path: '/' })
    cookie.remove('password', { path: '/' })
    this.props.logoutUser()
  }

  render() {
    let tabs = utils.reduceDuplicate(this.props.products)
    
    return (
      <div>
        {this.props.user.username == '' ? <Redirect to="/login" /> : null}
        {this.state.logged ?
          <Navbar tabs={tabs} searchProduct={(e) => this.searchProduct(e)} logout={() => this.logout()} />
          : null}
        <Switch>
          <Route path="/login" exact render={(props) => <Login {...props} login={() => this.getData()} />} />
          <Route path="/shop/:category" render={(props) => <Groceries {...props} filter={this.state.search} />} />
          <Route path="/cart" exact render={(props) => <Checkout {...props} />} />
          <Route path="/manage" exact render={(props) => <Manage {...props} productTabs={tabs} />} />
          <Route path="/customer" exact render={(props) => <Customer {...props} /> } />
          <Route path="/readme" exact render={() => <Readme />} />
          <Route render={() => <h1>not found</h1>} />
          {/* <Redirect from="/" to="/login" /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: (username, password) => dispatch(actionCreators.getProducts(username, password)),
    loadCartFromCookies: (username) => dispatch(actionCreators.loadCart(username)),
    logoutUser: () => dispatch(actionCreators.logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Organic);

