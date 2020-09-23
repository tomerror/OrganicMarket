import React, { Component } from 'react';
import CartContext from '../../context/cart-context';
import { Cart } from '../../components';
import './Checkout.css';

class Checkout extends Component {

    componentDidMount = () => {
        this.props.viewPage('cart')
    }    
    static contextType = CartContext;
    
    updateCartCounterInc = (product) => {
        let updateCart = this.context.items;
        updateCart.filter(x => x.name == product.item.name).map(x => {x.count++; x.supply--})
        let amount = parseFloat((this.context.amount + product.item.details.weight * (product.item.details.price)).toFixed(2))
        let cart = {
            amount: amount,
            count: this.context.count + 1,
            items: updateCart,
            delivery: this.context.delivery
        }
        this.props.setCart(cart)
    }

    updateCartCounterDec = (product) => {
        let updateCart = this.context.items;
        let idxProduct = updateCart.findIndex(x => x.name == product.item.name)
        if (idxProduct != -1) {
            if (updateCart[idxProduct].count > 1) {
                updateCart[idxProduct].count -= 1;
                updateCart[idxProduct].supply += 1;
            } else {
                updateCart.splice(idxProduct, 1);
            }
            let amount = parseFloat((this.context.amount - product.item.details.weight * (product.item.details.price - product.item.details.discount*0.1*product.item.details.price)).toFixed(2))
            let cart = {
                amount: amount,
                count: this.context.count - 1,
                items: updateCart,
                delivery: this.context.delivery
            }
            this.props.setCart(cart)
        }
    }

    
    render = () => {
        const products = <Cart
        cart={this.context}
        counterInc={(p) => this.updateCartCounterInc(p)}
        counterDec={(p) => this.updateCartCounterDec(p)} />

        const warning = this.context.items.filter(product => product.supply < 0 )

        return (
            <div className="checkout">
                <div className="checkout-title">
                    Checkout
                </div>
                <div>
                    {this.context.count == 0 ? <h1>Cart is empty</h1> :
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
                                        &#8362; {this.context.amount.toFixed(2)}
                                    </div>
                                </div>
                                <div className="checkout-bill-set">
                                    <div className="checkout-bill-title">
                                        Delivery:
                                </div>
                                    <div className="checkout-bill-amount">
                                        &#8362; {this.context.delivery}
                                    </div>
                                </div>
                                <hr />
                                <div className="checkout-bill-set">
                                    <div className="checkout-bill-title">
                                        Total sum:
                                </div>
                                    <div className="checkout-bill-amount total-amount">
                                        &#8362; {(this.context.amount + this.context.delivery).toFixed(2)}
                                    </div>
                                </div>
                                { warning.length > 0 ? 
                                (<div className="warning">
                                    <div>Warning!</div>
                                    <div className="warning-message">Your cart is including items more than have at the supply. You probably will get fewer products than your order. The refund will be returning for the diff.</div>
                                </div>)
                                : null }
                                <button className="checkout-button" onClick={() => this.props.sendPayment()}>Continue to payment</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Checkout;