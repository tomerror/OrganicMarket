import * as actionsTypes from '../actions/actionTypes';
import { Cart, Item } from 'organic-structures';

const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    admin: false,
    creation_date: '',
    error: '',
    logs: [],
    paymentHistory: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.SET_NEW_USER:
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                address: action.payload.address,
                admin: action.payload.admin,
                creation_date: action.payload.creation_date
            }
        case actionsTypes.LOGOUT_USER:
            return {
                ...state,
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                admin: false,
                creation_date: ''
            }
        case actionsTypes.FETCH_DETAILS_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionsTypes.FETCH_ADMIN_DATA:
            return {
                ...state,
                logs: action.logs
            }
        case actionsTypes.FETCH_PAYMENT_HISTORY:
            let cartArray = []
            action.value.forEach((cart) => {
                let tempCart = new Cart();
                tempCart.count = cart.count;
                tempCart.delivery = cart.delivery;
                cart.items.forEach(item => {
                    let tempItem = new Item(item);
                    tempCart.addItem(tempItem)
                })
                cartArray.push(tempCart)
            })
            return {
                ...state,
                paymentHistory: cartArray
            }
    }
    return state;
}

export default reducer;