import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import axios from 'axios';
import { Navbar, Groceries, Readme, Sidebar } from '../../components';
import UserContext from '../../context/user-context';
import { Checkout, Manage, Customer } from '../../containers';
import utils from '../../utils';
import classes from './Organic.module.css';
class Organic extends Component {
  state = {
    logged: false,
    user: {},
    products: [],
    cart: {
      amount: 0,
      count: 0,
      items: [],
      delivery: 50
    },
    search: '',
    tabs: [],
    error: ''
  }

  setUser = (u) => {
    this.setState({ user: u, logged: true })
  }

  setCart = (cart) => {
    cookie.save(`cart:${this.state.user.username}`, JSON.stringify(cart), { path: `/` })
    this.setState({ cart: cart });
  }

  getData = () => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `http://localhost:4000/data/shop`,
        data: { username: this.state.user.username, password: this.state.user.password }
      })
        .then((response) => {
          this.setState({ products: response.data })
          if (cookie.load(`cart:${this.state.user.username}`) != undefined) {
            const tempCart = cookie.load(`cart:${this.state.user.username}`)
            this.setState({ cart: tempCart })
            this.updateCartOnAdminChanges()
          }
          this.setTabs()
          resolve(this.state.tabs[0])
          //this.props.history.push(`/shop/fruits`);
        }, (error) => {
          let err = ''
          try { err = error.response.data }
          catch (error) { err = "A problem occurred at the server. Please try later" }
          finally { this.setState({ error: err }) }
        })
    })
  }

  setTabs = () => {
    let filter = utils.reduceDuplicate(this.state.products)
    this.setState({ tabs: filter })
  }

  updateCartOnAdminChanges = () => {
    let cart = {
      amount: 0,
      count: 0,
      items: [],
      delivery: this.state.cart.delivery
    }

    this.state.cart.items.forEach(fromCart => {
      let fromDB = this.state.products.filter((p) => p.display == fromCart.display)[0]
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
    // let search = event.target.value
    // if (search != '') {
    //   let found = []
    //   found = this.state.products.filter(f => f.display.toLowerCase().includes(search))
    //   this.setState({ section: found })
    // } else {
    //   this.changeSection(this.state.products[0].type)
    // }
  }

  logout = () => {
    cookie.remove('username', { path: '/' })
    cookie.remove('password', { path: '/' })
    // window.location.reload(false);
    this.props.history.push('/login');
  }

  setProducts = (p) => {
    this.setState({ products: p })
  }

  render() {
    let tabs = []
    if (this.state.tabs.length > 0) {
      tabs = utils.reduceDuplicate(this.state.products)
    }
    return (
      <div>
        <UserContext.Provider value={{ user: this.state.user }}>
          {this.state.logged ? <Navbar
            tabs={tabs}
            // menuFunc={(nav) => this.changeSection(nav)}
            // page={this.state.page}
            // viewPage={(p) => this.viewPage(p)}
            cartSize={this.state.cart.items.length}
            searchProduct={(e) => this.searchProduct(e)}
            logout={() => this.logout()}
            error={this.state.error} /> : null}
          <Switch>
            <Route path="/login" exact render={(props) => <Login {...props} setUser={(u) => this.setUser(u)} login={() => this.getData()} />} />
            <Route path="/shop/:category"
              render={(props) =>
                <Groceries {...props}
                  products={this.state.products}
                  filter={this.state.search}
                  cart={this.state.cart}
                  setCart={(c) => this.setCart(c)} />} />
            <Route path="/cart" exact render={(props) =>
              <Checkout {...props}
                cart={this.state.cart}
                setCart={(c) => this.setCart(c)}
              // sendPayment={() => this.sendPayment()}
              // viewPage={(s) => this.viewPage(s)}
              />} />
            <Route path="/manage" exact
              render={() =>
                <Manage
                  // getPanel={() => this.getPanel()}
                  setError={(e) => this.setError(e)}
                  clearError={() => this.clearError()}
                  products={this.state.products}
                  productTabs={this.state.tabs}
                  reloadProduct={() => this.getData()}
                //viewPage={(s) => this.viewPage(s)}
                />} />

            <Route path="/customer" exact
              render={() =>
                <Customer
                  setError={(e) => this.setError(e)}
                  clearError={() => this.clearError()} />} />
            <Route path="/readme" exact
              render={() => <Readme />} />
            <Redirect from="/" to="/login" />

          </Switch>
        </UserContext.Provider>
      </div>
    );
  }
}


{/* {this.state.logged ? <Shop /> : } */ }
{/* <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Shop} /> */}
//<Route path="/" exact component={Login} />
export default Organic;
