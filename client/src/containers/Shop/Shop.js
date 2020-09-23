import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import utils from '../../utils';
import { Navbar, Groceries, Readme, Sidebar } from '../../components';
import { Checkout, Manage, Customer } from '../../containers';
import './Shop.css';
import UserContext from '../../context/user-context';
import CartContext from '../../context/cart-context';

class Shop extends Component {
  state = {
    products: {},
    section: [],
    cartCounter: 0,
    cart: {
      amount: 0,
      count: 0,
      items: [],
      delivery: 50
    },
    page: '',
    menu: false,
    tabs: [],
    error: '',
    redirect: null
  }

  static contextType = UserContext;

  componentDidMount = () => {
    this.setState({ page: 'shop' });
    this.retrieveData();
  }

  retrieveData = () => {
    this.clearError();
    axios({
      method: 'post',
      url: `http://localhost:4000/data/shop`,
      data: { username: this.context.user.username, password: this.context.user.password }
    })
      .then((response) => {
        this.setState({ products: response.data })
        this.setState({ section: this.state.products.filter((product) => product.type == response.data[0].type) })
        if (cookie.load(`cart:${this.context.user.username}`) != undefined) {
          const tempCart = cookie.load(`cart:${this.context.user.username}`)
          this.setState({ cart: tempCart })
          this.updateCartOnAdminChanges()
        }
        this.setTabs()
      }, (error) => {
        let err = ''
        try { err = error.response.data }
        catch (error) { err = "A problem occurred at the server. Please try later" }
        finally { this.setState({ error: err }) }
      })
  }

  sendPayment = () => {
    this.clearError();
    axios({
      method: 'post',
      url: 'http://localhost:4000/payment/setPayment',
      headers: {},
      data: { username: this.context.user.username, password: this.context.user.password, cart: this.state.cart }
    }).then((response) => {
      if (response) {
        this.setState({ cart: { amount: 0, count: 0, items: [], delivery: 50 } })
        cookie.remove(`cart:${this.context.user.username}`, { path: '/' })
        this.changeSection(this.state.products[0].type)
      }
    }, (error) => {
      let err = ''
      try { err = error.response.data }
      catch (error) { err = "A problem occurred at the server. Please try later" }
      finally { this.setState({ error: err }) }
    });
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

  changeSection = (section) => {
    this.setState({ section: this.state.products.filter((product) => product.type == section.toLowerCase()), page: 'shop' })
  }

  setCart = (cart) => {
    cookie.save(`cart:${this.context.user.username}`, JSON.stringify(cart), { path: `/` })
    this.setState({ cart: cart });
  }

  viewPage = (page) => {
    this.setState({ page: page })
    console.log(page)
  }

  searchProduct = (event) => {
    this.viewPage('shop')
    let search = event.target.value
    if (search != '') {
      let found = []
      found = this.state.products.filter(f => f.display.toLowerCase().includes(search))
      this.setState({ section: found })
    } else {
      this.changeSection(this.state.products[0].type)
    }
  }

  setTabs = () => {
    let tabsArr = []
    this.state.products.map((p) => { if (!tabsArr.includes(utils.capitalize(p.type))) { tabsArr.push(utils.capitalize(p.type)) } })
    this.setState({ tabs: tabsArr })
  }

  logout = () => {
    cookie.remove('username', { path: '/' })
    cookie.remove('password', { path: '/' })
    window.location.reload(false);
  }

  setError = (err) => {
    this.setState({ error: err })
  }
  clearError = () => {
    this.setState({ error: '' })
  }
  render = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div>
        <CartContext.Provider value={{
          amount: this.state.cart.amount,
          count: this.state.cart.count,
          items: this.state.cart.items,
          delivery: this.state.cart.delivery
        }}>
          <Navbar
            tabs={this.state.tabs}
            menuFunc={(nav) => this.changeSection(nav)}
            page={this.state.page}
            viewPage={(p) => this.viewPage(p)}
            searchProduct={(e) => this.searchProduct(e)}
            logout={() => this.logout()}
            error={this.state.error} />
          <Sidebar tabs={this.state.tabs} />
          <div className="shop">
            <Route path="/"
              exact
              render={() =>
                <Groceries products={this.state.section}
                  cart={this.state.cart}
                  setCart={(c) => this.setCart(c)} />} />
            <Route path="/cart"
              exact
              render={() =>
                <Checkout
                  setCart={(c) => this.setCart(c)}
                  sendPayment={() => this.sendPayment()}
                  viewPage={(s) => this.viewPage(s)}
                />} />
          </div>
        </CartContext.Provider>
        <div className="shop">
          <Route path="/manage"
            exact
            render={() =>
              <Manage getPanel={() => this.getPanel()}
                setError={(e) => this.setError(e)}
                clearError={() => this.clearError()}
                p={this.state.products}
                productTabs={this.state.tabs}
                reloadProduct={() => this.retrieveData()}
                viewPage={(s) => this.viewPage(s)}
              />} />

          <Route path="/customer"
            exact
            render={() =>
              <Customer
                setError={(e) => this.setError(e)}
                clearError={() => this.clearError()}
                viewPage={(s) => this.viewPage(s)} />} />
          <Route path="/readme"
            exact
            render={() => <Readme />} />
        </div>
      </div>
    )
  }
}



export default Shop;
