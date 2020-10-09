import * as actionTypes from './actionTypes';
import axios from 'axios';
import cookie from 'react-cookies';

export const addProductToCart = (user, product) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        value: product,
        user: user
    }
}

export const removeProductFromCart = (user, product) => {
    return {
        type: actionTypes.REMOVE_PRODUCT_FROM_CART,
        value: product,
        user: user
    }
}

export const loadCart = (user) => {
    return {
        type: actionTypes.LOAD_CART,
        user: user
    }
}

export const initCart = () => {
    return {
        type: actionTypes.INIT_CART
    }
}

export const paymentFailed = (value) => {
    return {
        type: actionTypes.PAYMENT_FAILED,
        error: value
    };
}

export const pay = (username, password, cart) => {
    return dispatch => {
        axios({
            method: 'post',
            url: `http://localhost:4000/payment/setPayment`,
            data: { username: username, password: password, cart: cart }
        })
            .then(response => {
                cookie.remove(`cart:${this.props.user.username}`, { path: '/' })
                dispatch(initCart())
            })
            .catch(error => {
                dispatch(paymentFailed(error))
            })
    }
}