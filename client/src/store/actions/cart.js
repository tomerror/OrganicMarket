import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addProductToCart = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        value: product
    }
}

export const removeProductFromCart = (product) => {
    return {
        type: actionTypes.REMOVE_PRODUCT_FROM_CART,
        value: product
    }
}

export const incProductInCart = (product) => {
    return {
        type: actionTypes.INCREMENT_PRODUCT_IN_CART,
        value: product
    }
}

export const decProductInCart = (product) => {
    return {
        type: actionTypes.DECREMENT_PRODUCT_IN_CART,
        value: product
    }
}

export const initCart = () => {
    return {
        type: actionTypes.INIT_CART
    }
}



