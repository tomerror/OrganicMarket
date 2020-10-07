import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import { Navbar, Groceries, Readme, Sidebar } from '../../components';
import { Checkout, Manage, Customer } from '../../containers';
import utils from '../../utils';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Organic extends Component {
  state = {
    logged: false,
    search: '',
    tabs: []
  }

  // setUser = (u) => {
  //   this.setState({ user: u, logged: true })
  // }

  // setCart = (cart) => {
  //   cookie.save(`cart:${this.props.user.username}`, JSON.stringify(cart), { path: `/` })
  //   this.setState({ cart: cart });
  //   this.props.onIncrementCounter();
  // }

  getData = () => {
    this.props.getProducts(this.props.user.username, this.props.user.password);
    if (cookie.load(`cart:${this.props.user.username}`) != undefined) {
      const tempCart = cookie.load(`cart:${this.props.user.username}`)
      this.setState({ cart: tempCart })
      this.updateCartOnAdminChanges()
    }
    this.setState({ logged: true })
    // return new Promise((resolve, reject) => {
    //   axios({
    //     method: 'post',
    //     url: `http://localhost:4000/data/shop`,
    //     data: { username: this.props.user.username, password: this.props.user.password }
    //   })
    //     .then((response) => {
    //       //this.props.getProducts(this.props.user.username, this.props.user.password)
    //       this.props.addProduct(response.data)

    //       if (cookie.load(`cart:${this.props.user.username}`) != undefined) {
    //         const tempCart = cookie.load(`cart:${this.props.user.username}`)
    //         this.setState({ cart: tempCart })
    //         this.updateCartOnAdminChanges()
    //       }
    //       this.setTabs()
    //       this.setState({ logged: true })
    //       resolve(this.state.tabs[0])
    //     }, (error) => {
    //       let err = ''
    //       try { err = error.response.data }
    //       catch (error) { err = "A problem occurred at the server. Please try later" }
    //       finally { this.setState({ error: err }) }
    //     })
    // })
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
        "category": fromDB.type,
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

  setError = (err) => {
    this.setState({ error: err })
  }
  clearError = () => {
    this.setState({ error: '' })
  }
  searchProduct = (event) => {
    this.setState({ search: event.target.value })
  }

  logout = () => {
    cookie.remove('username', { path: '/' })
    cookie.remove('password', { path: '/' })
    this.props.logoutUser()
  }

  setProducts = (p) => {
    this.setState({ products: p })
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
          <Route path="/customer" exact
            render={(props) => <Customer {...props} setError={(e) => this.setError(e)} clearError={() => this.clearError()} />} />
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
    logoutUser: () => dispatch(actionCreators.logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Organic);

