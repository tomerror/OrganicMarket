import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Cart } from '../../components';
import './Checkout.css';
import UserContext from '../../context/user-context';

class Checkout extends Component {
    static contextType = UserContext;
    updateCartCounterInc = (product) => {
        let updateCart = this.props.cart.items;
        updateCart.filter(x => x.name == product.item.name).map(x => {x.count++; x.supply--})
        let amount = parseFloat((this.props.cart.amount + product.item.details.weight * (product.item.details.price)).toFixed(2))
        let cart = {
            amount: amount,
            count: this.props.cart.count + 1,
            items: updateCart,
            delivery: this.props.cart.delivery
        }
        this.props.setCart(cart)
    }

    updateCartCounterDec = (product) => {
        let updateCart = this.props.cart.items;
        let idxProduct = updateCart.findIndex(x => x.name == product.item.name)
        if (idxProduct != -1) {
            if (updateCart[idxProduct].count > 1) {
                updateCart[idxProduct].count -= 1;
                updateCart[idxProduct].supply += 1;
            } else {
                updateCart.splice(idxProduct, 1);
            }
            let amount = parseFloat((this.props.cart.amount - product.item.details.weight * (product.item.details.price - product.item.details.discount*0.1*product.item.details.price)).toFixed(2))
            let cart = {
                amount: amount,
                count: this.props.cart.count - 1,
                items: updateCart,
                delivery: this.props.cart.delivery
            }
            this.props.setCart(cart)
        }
    }

    sendPayment = () => {
        //this.clearError();
        axios({
          method: 'post',
          url: 'http://localhost:4000/payment/setPayment',
          headers: {},
          data: { username: this.context.user.username, password: this.context.user.password, cart: this.props.cart }
        }).then((response) => {
          if (response) {
            this.setState({ cart: { amount: 0, count: 0, items: [], delivery: 50 } })
            cookie.remove(`cart:${this.context.user.username}`, { path: '/' })
            //this.changeSection(this.state.products[0].type)
          }
        }, (error) => {
          let err = ''
          try { err = error.response.data }
          catch (error) { err = "A problem occurred at the server. Please try later" }
          finally { this.setState({ error: err }) }
        });
      }
    
    render = () => {
        const products = <Cart
        cart={this.props.cart}
        counterInc={(p) => this.updateCartCounterInc(p)}
        counterDec={(p) => this.updateCartCounterDec(p)} />

        const warning = this.props.cart.items.filter(product => product.supply < 0 )

        return (
            <div className="checkout">
                <div className="checkout-title">
                    Checkout
                </div>
                <div>
                    {this.props.cart.count == 0 ? <h1>Cart is empty</h1> :
                        <div>
                            <div>
                                <div className="checkout-details">
                                    {products}
                                </div>
                            </div>
                            <div className="checkout-bill">
                                <div className="checkout-bill-set">
                                    <div className="checkout-bill-title">
                                        Items total:
                                </div>
                                    <div className="checkout-bill-amount">
                                        &#8362; {this.props.cart.amount.toFixed(2)}
                                    </div>
                                </div>
                                <div className="checkout-bill-set">
                                    <div className="checkout-bill-title">
                                        Delivery:
                                </div>
                                    <div className="checkout-bill-amount">
                                        &#8362; {this.props.cart.delivery}
                                    </div>
                                </div>
                                <hr />
                                <div className="checkout-bill-set">
                                    <div className="checkout-bill-title">
                                        Total sum:
                                </div>
                                    <div className="checkout-bill-amount total-amount">
                                        &#8362; {(this.props.cart.amount + this.props.cart.delivery).toFixed(2)}
                                    </div>
                                </div>
                                { warning.length > 0 ? 
                                (<div className="warning">
                                    <div>Warning!</div>
                                    <div className="warning-message">Your cart is including items more than have at the supply. You probably will get fewer products than your order. The refund will be returning for the diff.</div>
                                </div>)
                                : null }
                                <button className="checkout-button" onClick={() => this.sendPayment()}>Continue to payment</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Checkout;