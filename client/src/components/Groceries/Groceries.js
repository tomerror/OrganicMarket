import React from 'react';
import cookie from 'react-cookies';
import { Route, Switch, Redirect } from 'react-router-dom';
import Products from '../Products/Products';
import styles from './Groceries.module.css';
import { connect } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../../store/actions/index';

const Groceries = (props) => {
    if (props.user.username == undefined) {
        return <Redirect to="/login" />
    }

    let products = []
    if (props.products.length != 0) {
        let productView = [];
        if (props.filter != '') {
            productView = props.products.filter(product => product.display.toLowerCase().includes(props.filter))
        } else {
            productView = props.products.filter(product => product.category == props.match.params.category.toLowerCase())
        }
        products = <Products
            products={productView}
            cart={props.cart.cart}
            counterInc={(product) => props.addProductToCart(props.user.username, product)}
            counterDec={(product) => props.removeProductToCart(props.user.username, product)}
        />
    }

    return (
        <div className={styles.frame}>
            {products}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        products: state.products.products,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: (user, product) => dispatch(addProductToCart(user, product)),
        removeProductToCart: (user, product) => dispatch(removeProductFromCart(user, product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groceries);