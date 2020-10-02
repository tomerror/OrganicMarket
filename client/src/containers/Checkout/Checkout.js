import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import { Cart } from '../../components';
import './Checkout.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class Checkout extends Component {
    sendPayment = () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/payment/setPayment',
            headers: {},
            data: { username: this.props.user.username, password: this.props.user.password, cart: this.props.cart }
        }).then((response) => {
            if (response) {
                this.props.init_cart()
                cookie.remove(`cart:${this.props.user.username}`, { path: '/' })
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
            counterInc={(p) => this.props.inc_product_in_cart(p)}
            counterDec={(p) => this.props.dec_product_in_cart(p)} />

        const warning = this.props.cart.items.filter(product => product.supply < 0)

        return (
            <div>
                { this.props.user.username == '' ? <Redirect to="/login" /> :
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
                                        {warning.length > 0 ?
                                            (<div className="warning">
                                                <div>Warning!</div>
                                                <div className="warning-message">Your cart is including items more than have at the supply. You probably will get fewer products than your order. The refund will be returning for the diff.</div>
                                            </div>)
                                            : null}
                                        <button className="checkout-button" onClick={() => this.sendPayment()}>Continue to payment</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        inc_product_in_cart: (product) => dispatch({ type: actionTypes.INC_PRODUCT_IN_CART, value: product }),
        dec_product_in_cart: (product) => dispatch({ type: actionTypes.DEC_PRODUCT_IN_CART, value: product }),
        init_cart: () => dispatch({type: actionTypes.INIT_CART})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);