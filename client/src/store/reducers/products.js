import * as actionsTypes from '../actions/actionTypes';

const initialState = {
    products: [],
    error: ''
}

// push is bad practice. instead we should create a new copy by concat and not rely on the original as push does.
const reducer = (state = initialState, action) => {
    let productCopy = null;
    switch (action.type) {
        case actionsTypes.ADD_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.products),
                error: ''
            }
        case actionsTypes.FETCH_PRODUCT_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionsTypes.SET_PRODUCT_DISCOUNT:
            productCopy = [...state.products];
            productCopy.map(product => {
                if (product.display === action.product) {
                    product.discount = product.discount == 1 ? 0 : 1
                }
            })
            return {
                ...state,
                products: productCopy,
                error: ''
            }
        case actionsTypes.TOGGLE_PRODUCT_VISIBILITY:
            productCopy = [...state.products];
            productCopy.map(product => {
                if (product.display === action.product) {
                    product.show = product.show == "true" ? "false" : "true"
                }
            })
            return {
                ...state,
                products: productCopy,
                error: ''
            }
        case actionsTypes.INCREMENT_PRODUCT_SUPPLY:
            productCopy = [...state.products];
            productCopy.map(product => {
                if (product.display === action.product) {
                    product.supply = parseInt(product.supply) + 1
                }
            })
            return {
                ...state,
                products: productCopy,
                error: ''
            }
        case actionsTypes.DECREMENT_PRODUCT_SUPPLY:
            productCopy = [...state.products];
            productCopy.map(product => {
                if (product.display === action.product) {
                    product.supply = parseInt(product.supply) - 1
                }
            })
            return {
                ...state,
                products: productCopy,
                error: ''
            }
    }
    return state;
}

export default reducer;