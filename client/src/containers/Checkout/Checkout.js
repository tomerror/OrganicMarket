import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Cart } from '../../components';
import './Checkout.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {
    sendPayment = () => {
        this.props.pay(this.props.user.username, this.props.user.password, this.props.cart);
    }

    render = () => {
        const products = <Cart
            cart={this.props.cart}
            counterInc={(p) => this.props.addProductToCart(this.props.user.username, p)}
            counterDec={(p) => this.props.removeProductToCart(this.props.user.username, p)} />

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
                                                &#8362; {(this.props.cart.amount() - this.props.cart.delivery).toFixed(2)}
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
                                                &#8362; {this.props.cart.amount().toFixed(2)}
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
        cart: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: (user, product) => dispatch(actionCreators.addProductToCart(user, product)),
        removeProductToCart: (user, product) => dispatch(actionCreators.removeProductFromCart(user, product)),
        pay: (username, password, cart) => dispatch(actionCreators.pay(username, password, cart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);