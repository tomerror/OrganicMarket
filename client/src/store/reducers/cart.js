import * as actionsTypes from '../actions/actionTypes';
import cookie from 'react-cookies';
import { Cart } from 'organic-structures';

const initialState = {
    error: false,
    cart: new Cart()
}

const saveCartInCookies = (user, cart) => {
    cookie.save(`cart:${user}`, JSON.stringify(cart), { path: `/` })
}

const reducer = (state = initialState, action) => {
    let tempCart = null

    switch (action.type) {
        case actionsTypes.INIT_CART:
            return {
                ...state,
                cart: new Cart()
            }

        case actionsTypes.ADD_PRODUCT_TO_CART:
            saveCartInCookies(action.user, state.cart);
            state.cart.addItem(action.value);
            tempCart = new Cart()
            tempCart.assign(state.cart)
            return {
                ...state,
                cart: tempCart
            }

        case actionsTypes.REMOVE_PRODUCT_FROM_CART:
            saveCartInCookies(action.user, state.cart);
            state.cart.removeItem(action.value);
            tempCart = new Cart()
            tempCart.assign(state.cart)
            return {
                ...state,
                cart: tempCart
            }

        case actionsTypes.UPDATE_CART_FAILED:
            return {
                ...state,
                error: action.value
            }
        case actionsTypes.PAYMENT_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionsTypes.LOAD_CART:
            tempCart = new Cart()
            tempCart.assign(cookie.load(`cart:${action.user}`))
            return {
                ...state,
                cart: tempCart
            }
    }
    return state;
}

export default reducer;