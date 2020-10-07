import React from 'react';
import { Redirect } from 'react-router-dom';
import Products from '../Products/Products';
import styles from './Groceries.module.css';
import { connect } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../../store/actions/index';

const Groceries = (props) => {
    if (props.user.username == undefined) {
        return <Redirect to="/login" />
    }

    let products = []
    if (props.products.length != undefined) {
        let productView = [];
        if (props.filter != '') {
            productView = props.products.filter(product => product.display.toLowerCase().includes(props.filter))
        } else {
            productView = props.products.filter(product => product.type == props.match.params.category.toLowerCase())
        }
        products = <Products
            products={productView}
            cart={props.cart}
            counterInc={(product) => props.addProductToCart(product)}
            counterDec={(product) => props.removeProductToCart(product)}
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
        addProductToCart: (product) => dispatch(addProductToCart(product)),
        removeProductToCart: (product) => dispatch(removeProductFromCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groceries);